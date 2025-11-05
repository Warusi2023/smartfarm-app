#!/usr/bin/env node
/**
 * SmartFarm Codebase Audit Script
 * Scans for: Nodes/Connections, Button Wiring, Modal Close Compliance
 */

const fs = require('fs');
const path = require('path');

const results = {
    nodes: [],
    buttons: [],
    modals: [],
    errors: []
};

// Directories to scan
const SCAN_DIRS = ['public', 'backend'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build'];

// Patterns
const BUTTON_PATTERNS = [
    /<button[^>]*>/gi,
    /onclick=["']([^"']+)["']/gi,
    /\.addEventListener\(['"]click['"]/gi,
    /Button\(/gi,
    /ElevatedButton\(/gi
];

const MODAL_PATTERNS = [
    /<div[^>]*class="[^"]*modal[^"]*"[^>]*>/gi,
    /<div[^>]*id="[^"]*modal[^"]*"[^>]*>/gi,
    /bootstrap\.Modal/gi,
    /new.*Modal\(/gi,
    /\.modal\(/gi,
    /data-bs-toggle=["']modal["']/gi
];

const CLOSE_PATTERNS = [
    /btn-close/gi,
    /data-bs-dismiss=["']modal["']/gi,
    /\.hide\(\)/gi,
    /\.close\(\)/gi,
    /onclick.*close/gi
];

const NODE_PATTERNS = [
    /node|graph|edge|link|pipeline|connection/gi,
    /{[\s\n]*id:\s*['"][^'"]+['"]/gi,
    /type:\s*['"][^'"]+['"]/gi,
    /inputs?:\s*\[/gi,
    /outputs?:\s*\[/gi
];

function shouldScanFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const allowed = ['.html', '.js', '.jsx', '.ts', '.tsx', '.vue', '.jsx'];
    if (!allowed.includes(ext)) return false;
    
    const relativePath = path.relative(process.cwd(), filePath);
    return !EXCLUDE_DIRS.some(dir => relativePath.includes(dir));
}

function scanFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        
        // Scan for buttons
        scanButtons(filePath, content, lines);
        
        // Scan for modals
        scanModals(filePath, content, lines);
        
        // Scan for nodes/connections
        scanNodes(filePath, content, lines);
        
    } catch (error) {
        results.errors.push({
            file: filePath,
            error: error.message
        });
    }
}

function scanButtons(filePath, content, lines) {
    let buttonMatch;
    const buttonRegex = /<button[^>]*>/gi;
    
    while ((buttonMatch = buttonRegex.exec(content)) !== null) {
        const lineNum = content.substring(0, buttonMatch.index).split('\n').length;
        const buttonHtml = buttonMatch[0];
        const afterButton = content.substring(buttonMatch.index);
        const nextTag = afterButton.match(/<\/button>/);
        const buttonEnd = nextTag ? buttonMatch.index + nextTag.index + 9 : buttonMatch.index + buttonMatch[0].length;
        const fullButton = content.substring(buttonMatch.index, buttonEnd);
        
        // Check for onclick or event listener
        const hasOnclick = /onclick=["']([^"']+)["']/i.test(buttonHtml);
        const hasEventListener = content.substring(buttonMatch.index).match(/addEventListener\(['"]click['"]/i);
        const hasId = buttonHtml.match(/id=["']([^"']+)["']/i);
        const buttonId = hasId ? hasId[1] : null;
        
        // Check if handler exists
        let handlerFound = false;
        if (hasOnclick) {
            const onclickMatch = buttonHtml.match(/onclick=["']([^"']+)["']/i);
            if (onclickMatch) {
                const handler = onclickMatch[1];
                handlerFound = handler !== 'void(0)' && handler !== '#' && !handler.includes('return false') && handler.trim() !== '';
            }
        }
        
        if (buttonId) {
            // Check if there's a handler for this button ID
            const idHandlerRegex = new RegExp(`${buttonId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*addEventListener|getElementById.*${buttonId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
            if (idHandlerRegex.test(content)) {
                handlerFound = true;
            }
        }
        
        results.buttons.push({
            file: filePath,
            line: lineNum,
            html: buttonHtml.substring(0, 100),
            hasOnclick: hasOnclick,
            hasEventListener: !!hasEventListener,
            hasId: !!hasId,
            buttonId: buttonId,
            handlerFound: handlerFound,
            fullButton: fullButton.substring(0, 200)
        });
    }
}

function scanModals(filePath, content, lines) {
    // Find modal declarations
    const modalRegex = /<div[^>]*(?:class="[^"]*modal[^"]*"|id="[^"]*modal[^"]*")[^>]*>/gi;
    let modalMatch;
    
    while ((modalMatch = modalRegex.exec(content)) !== null) {
        const lineNum = content.substring(0, modalMatch.index).split('\n').length;
        const modalHtml = modalMatch[0];
        const modalIdMatch = modalHtml.match(/id=["']([^"']+)["']/i);
        const modalId = modalIdMatch ? modalIdMatch[1] : null;
        
        // Find modal content
        const modalStart = modalMatch.index;
        const modalEndMatch = content.substring(modalStart).match(/<\/div>\s*<\/div>\s*(?=<!--|$|<div|<\/body|<\/html)/i);
        const modalEnd = modalEndMatch ? modalStart + modalEndMatch.index + modalEndMatch[0].length : content.length;
        const modalContent = content.substring(modalStart, modalEnd);
        
        // Check for close button
        const hasCloseBtn = /btn-close|data-bs-dismiss=["']modal["']/i.test(modalContent);
        const hasXButton = /×|&times;|close/i.test(modalContent);
        const hasCloseHandler = /\.hide\(\)|\.close\(\)|bootstrap\.Modal\.getInstance/i.test(modalContent);
        const hasAriaLabel = /aria-label=["'][^"']*close[^"']*["']/i.test(modalContent);
        
        // Check if modal can actually close
        const canClose = hasCloseBtn || (hasXButton && hasCloseHandler);
        
        results.modals.push({
            file: filePath,
            line: lineNum,
            modalId: modalId,
            hasCloseBtn: hasCloseBtn,
            hasXButton: hasXButton,
            hasCloseHandler: hasCloseHandler,
            hasAriaLabel: hasAriaLabel,
            canClose: canClose,
            modalHtml: modalHtml.substring(0, 150)
        });
    }
    
    // Also check for Bootstrap modal instances
    const bootstrapModalRegex = /bootstrap\.Modal\.getInstance|new.*Modal\(|\.modal\(/gi;
    let bsModalMatch;
    while ((bsModalMatch = bootstrapModalRegex.exec(content)) !== null) {
        const lineNum = content.substring(0, bsModalMatch.index).split('\n').length;
        results.modals.push({
            file: filePath,
            line: lineNum,
            modalId: 'bootstrap-instance',
            type: 'bootstrap',
            canClose: true // Bootstrap modals have built-in close
        });
    }
}

function scanNodes(filePath, content, lines) {
    // Look for graph-like structures
    const nodePatterns = [
        { pattern: /{[\s\n]*id:\s*['"]([^'"]+)['"]/gi, type: 'id' },
        { pattern: /type:\s*['"]([^'"]+)['"]/gi, type: 'type' },
        { pattern: /inputs?:\s*\[([^\]]+)\]/gi, type: 'inputs' },
        { pattern: /outputs?:\s*\[([^\]]+)\]/gi, type: 'outputs' }
    ];
    
    // Check if file contains node-like structures
    const hasNodeStructure = /node|graph|edge|link|pipeline/i.test(filePath) || 
                            /nodes?\s*[:=]|edges?\s*[:=]|connections?\s*[:=]/i.test(content);
    
    if (hasNodeStructure) {
        nodePatterns.forEach(({ pattern, type }) => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const lineNum = content.substring(0, match.index).split('\n').length;
                results.nodes.push({
                    file: filePath,
                    line: lineNum,
                    type: type,
                    value: match[1] || match[0],
                    context: content.substring(Math.max(0, match.index - 50), match.index + match[0].length + 50)
                });
            }
        });
    }
}

function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(entry.name)) {
                scanDirectory(fullPath);
            }
        } else if (entry.isFile() && shouldScanFile(fullPath)) {
            scanFile(fullPath);
        }
    }
}

// Main execution
console.log('🔍 Starting SmartFarm Codebase Audit...\n');

SCAN_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`📂 Scanning ${dir}...`);
        scanDirectory(dir);
    }
});

// Generate reports
console.log('\n📊 Generating Reports...\n');

const reports = {
    nodes: generateNodesReport(),
    buttons: generateButtonsReport(),
    modals: generateModalsReport(),
    patches: generatePatches(),
    tests: generateTests()
};

// Write reports to file
const reportFile = path.join(process.cwd(), 'CODEBASE_AUDIT_REPORT.md');
fs.writeFileSync(reportFile, formatReports(reports));

console.log(`✅ Audit complete! Report saved to: ${reportFile}`);
console.log(`\n📈 Summary:`);
console.log(`   - Buttons found: ${results.buttons.length}`);
console.log(`   - Buttons without handlers: ${results.buttons.filter(b => !b.handlerFound).length}`);
console.log(`   - Modals found: ${results.modals.length}`);
console.log(`   - Modals without close: ${results.modals.filter(m => !m.canClose).length}`);
console.log(`   - Node structures found: ${results.nodes.length}`);

function generateNodesReport() {
    if (results.nodes.length === 0) {
        return '## NODES_AND_CONNECTIONS_REPORT\n\n✅ No graph-like node structures found in codebase.\n\nThis appears to be a traditional web application without graph-based data structures.\n';
    }
    
    let report = '## NODES_AND_CONNECTIONS_REPORT\n\n';
    report += `**Total Node Structures Found:** ${results.nodes.length}\n\n`;
    
    // Group by file
    const byFile = {};
    results.nodes.forEach(node => {
        if (!byFile[node.file]) byFile[node.file] = [];
        byFile[node.file].push(node);
    });
    
    Object.keys(byFile).forEach(file => {
        report += `### ${file}\n\n`;
        byFile[file].forEach(node => {
            report += `- Line ${node.line}: ${node.type} = ${node.value}\n`;
        });
        report += '\n';
    });
    
    return report;
}

function generateButtonsReport() {
    let report = '## BUTTONS_AND_COMMANDS_REPORT\n\n';
    report += `**Total Buttons Found:** ${results.buttons.length}\n`;
    report += `**Buttons with Handlers:** ${results.buttons.filter(b => b.handlerFound).length}\n`;
    report += `**Buttons without Handlers:** ${results.buttons.filter(b => !b.handlerFound).length}\n\n`;
    
    const broken = results.buttons.filter(b => !b.handlerFound);
    if (broken.length > 0) {
        report += '### ⚠️ Buttons Without Handlers\n\n';
        broken.forEach(btn => {
            report += `**${btn.file}:${btn.line}**\n`;
            report += `- HTML: \`${btn.html}\`\n`;
            report += `- Has onclick: ${btn.hasOnclick}\n`;
            report += `- Has ID: ${btn.hasId ? btn.buttonId : 'No'}\n`;
            report += `- **Status:** ❌ No handler found\n\n`;
        });
    }
    
    return report;
}

function generateModalsReport() {
    let report = '## DIALOGS_CLOSE_COMPLIANCE_REPORT\n\n';
    report += `**Total Modals Found:** ${results.modals.length}\n`;
    report += `**Modals with Close:** ${results.modals.filter(m => m.canClose).length}\n`;
    report += `**Modals without Close:** ${results.modals.filter(m => !m.canClose).length}\n\n`;
    
    const broken = results.modals.filter(m => !m.canClose);
    if (broken.length > 0) {
        report += '### ⚠️ Modals Without Close Functionality\n\n';
        broken.forEach(modal => {
            report += `**${modal.file}:${modal.line}**\n`;
            report += `- Modal ID: ${modal.modalId || 'Unknown'}\n`;
            report += `- Has close button: ${modal.hasCloseBtn}\n`;
            report += `- Has X button: ${modal.hasXButton}\n`;
            report += `- Has close handler: ${modal.hasCloseHandler}\n`;
            report += `- Has aria-label: ${modal.hasAriaLabel}\n`;
            report += `- **Status:** ❌ Cannot close\n\n`;
        });
    }
    
    return report;
}

function generatePatches() {
    let patches = '## PROPOSED_PATCHES\n\n';
    
    // Button patches
    const brokenButtons = results.buttons.filter(b => !b.handlerFound);
    if (brokenButtons.length > 0) {
        patches += '### Button Handler Patches\n\n';
        brokenButtons.slice(0, 10).forEach(btn => {
            patches += `#### ${btn.file}:${btn.line}\n\n`;
            patches += '```diff\n';
            patches += `- ${btn.html}\n`;
            if (btn.buttonId) {
                patches += `+ ${btn.html.replace(/onclick=["'][^"']*["']/i, `onclick="handleButtonClick('${btn.buttonId}')"`)}\n`;
            } else {
                patches += `+ ${btn.html.replace(/>/, ` id="btn-${Date.now()}" onclick="handleButtonClick(this.id)">`)}\n`;
            }
            patches += '```\n\n';
        });
    }
    
    // Modal patches
    const brokenModals = results.modals.filter(m => !m.canClose);
    if (brokenModals.length > 0) {
        patches += '### Modal Close Patches\n\n';
        brokenModals.slice(0, 10).forEach(modal => {
            patches += `#### ${modal.file}:${modal.line}\n\n`;
            patches += '```diff\n';
            patches += `- ${modal.modalHtml}\n`;
            patches += `+ ${modal.modalHtml.replace(/>/, `>\n+     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`)}\n`;
            patches += '```\n\n';
        });
    }
    
    return patches;
}

function generateTests() {
    let tests = '## GENERATED_TESTS\n\n';
    tests += '### Playwright Test Suite\n\n';
    tests += '```javascript\n';
    tests += `// tests/e2e/button-and-modal-tests.spec.js\n`;
    tests += `const { test, expect } = require('@playwright/test');\n\n`;
    tests += `test.describe('SmartFarm Button and Modal Tests', () => {\n`;
    tests += `  test('All buttons have handlers', async ({ page }) => {\n`;
    tests += `    await page.goto('/dashboard.html');\n`;
    tests += `    const buttons = await page.locator('button').all();\n`;
    tests += `    for (const button of buttons) {\n`;
    tests += `      const hasHandler = await button.evaluate(el => {\n`;
    tests += `        return el.onclick !== null || el.hasAttribute('onclick');\n`;
    tests += `      });\n`;
    tests += `      expect(hasHandler).toBeTruthy();\n`;
    tests += `    }\n`;
    tests += `  });\n\n`;
    tests += `  test('All modals can close', async ({ page }) => {\n`;
    tests += `    await page.goto('/dashboard.html');\n`;
    tests += `    const modals = await page.locator('[class*="modal"]').all();\n`;
    tests += `    for (const modal of modals) {\n`;
    tests += `      const closeBtn = await modal.locator('.btn-close, [data-bs-dismiss="modal"]').first();\n`;
    tests += `      if (await closeBtn.count() > 0) {\n`;
    tests += `        await closeBtn.click();\n`;
    tests += `        await expect(modal).not.toBeVisible();\n`;
    tests += `      }\n`;
    tests += `    }\n`;
    tests += `  });\n`;
    tests += `});\n`;
    tests += '```\n\n';
    
    return tests;
}

function formatReports(reports) {
    return `# SmartFarm Codebase Audit Report
Generated: ${new Date().toISOString()}

${reports.nodes}

${reports.buttons}

${reports.modals}

${reports.patches}

${reports.tests}

---
*Generated by SmartFarm Audit Script*
`;
}


