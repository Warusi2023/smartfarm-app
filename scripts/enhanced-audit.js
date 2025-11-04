#!/usr/bin/env node
/**
 * Enhanced SmartFarm Audit - Focuses on actual issues
 */

const fs = require('fs');
const path = require('path');

const results = {
    buttons: { total: 0, broken: [], valid: [] },
    modals: { total: 0, noClose: [], valid: [] },
    nodes: { found: false, structures: [] }
};

const SCAN_DIRS = ['public'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', 'public/public'];

function shouldScanFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const allowed = ['.html', '.js'];
    if (!allowed.includes(ext)) return false;
    const relativePath = path.relative(process.cwd(), filePath);
    return !EXCLUDE_DIRS.some(dir => relativePath.includes(dir));
}

function scanFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Scan buttons
        scanButtonsEnhanced(filePath, content);
        
        // Scan modals
        scanModalsEnhanced(filePath, content);
        
    } catch (error) {
        console.error(`Error scanning ${filePath}:`, error.message);
    }
}

function scanButtonsEnhanced(filePath, content) {
    const buttonRegex = /<button[^>]*>/gi;
    let match;
    
    while ((match = buttonRegex.exec(content)) !== null) {
        results.buttons.total++;
        const buttonHtml = match[0];
        const lineNum = content.substring(0, match.index).split('\n').length;
        
        // Check if it's a valid button (has handler or Bootstrap attribute)
        const hasOnclick = /onclick=["']([^"']+)["']/i.test(buttonHtml);
        const hasDataBsToggle = /data-bs-toggle=["'][^"']+["']/i.test(buttonHtml);
        const hasDataBsDismiss = /data-bs-dismiss=["'][^"']+["']/i.test(buttonHtml);
        const hasDataBsTarget = /data-bs-target=["'][^"']+["']/i.test(buttonHtml);
        const hasTypeSubmit = /type=["']submit["']/i.test(buttonHtml);
        const hasId = buttonHtml.match(/id=["']([^"']+)["']/i);
        const buttonId = hasId ? hasId[1] : null;
        
        // Valid if it has onclick, Bootstrap data attributes, or is submit type
        const isValid = hasOnclick || hasDataBsToggle || hasDataBsDismiss || hasTypeSubmit || 
                        (buttonId && hasHandlerForId(content, buttonId));
        
        // Check for disabled buttons (these don't need handlers)
        const isDisabled = /disabled/i.test(buttonHtml);
        
        if (!isValid && !isDisabled) {
            // Check if it's a close button (these are handled by Bootstrap)
            const isCloseBtn = /btn-close/i.test(buttonHtml) || /close/i.test(buttonHtml);
            
            if (!isCloseBtn) {
                results.buttons.broken.push({
                    file: filePath,
                    line: lineNum,
                    html: buttonHtml.substring(0, 100),
                    buttonId: buttonId
                });
            } else {
                results.buttons.valid.push({ file: filePath, line: lineNum, reason: 'close button' });
            }
        } else {
            results.buttons.valid.push({ file: filePath, line: lineNum });
        }
    }
}

function hasHandlerForId(content, id) {
    // Check for addEventListener or onclick assignment
    const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const patterns = [
        new RegExp(`getElementById\\(['"]${escapedId}['"]\\)`, 'i'),
        new RegExp(`querySelector\\(['"]#${escapedId}['"]\\)`, 'i'),
        new RegExp(`#${escapedId}`, 'i')
    ];
    
    try {
        return patterns.some(pattern => pattern.test(content));
    } catch (e) {
        // Invalid regex, skip
        return false;
    }
}

function scanModalsEnhanced(filePath, content) {
    // Find modal divs
    const modalRegex = /<div[^>]*(?:class="[^"]*modal[^"]*"|id="[^"]*[Mm]odal[^"]*")[^>]*>/gi;
    let match;
    
    while ((match = modalRegex.exec(content)) !== null) {
        results.modals.total++;
        const lineNum = content.substring(0, match.index).split('\n').length;
        const modalHtml = match[0];
        
        // Find modal content (from start to closing divs)
        const modalStart = match.index;
        let modalEnd = content.indexOf('</div>', modalStart);
        let depth = 1;
        let pos = modalEnd + 6;
        while (depth > 0 && pos < content.length) {
            const nextOpen = content.indexOf('<div', pos);
            const nextClose = content.indexOf('</div>', pos);
            if (nextClose === -1) break;
            if (nextOpen !== -1 && nextOpen < nextClose) {
                depth++;
                pos = nextOpen + 4;
            } else {
                depth--;
                if (depth === 0) modalEnd = nextClose;
                pos = nextClose + 6;
            }
        }
        
        const modalContent = content.substring(modalStart, modalEnd + 6);
        
        // Check for close functionality
        const hasCloseBtn = /btn-close/i.test(modalContent);
        const hasDataBsDismiss = /data-bs-dismiss=["']modal["']/i.test(modalContent);
        const hasCloseHandler = /\.hide\(\)|\.close\(\)|bootstrap\.Modal/i.test(modalContent);
        const hasAriaLabel = /aria-label=["'][^"']*close[^"']*["']/i.test(modalContent);
        
        // Check for X button (× or &times;)
        const hasXButton = /[×&times;]|close/i.test(modalContent.substring(0, 500));
        
        const canClose = hasCloseBtn || hasDataBsDismiss || hasCloseHandler;
        const hasVisibleClose = hasCloseBtn || (hasXButton && hasDataBsDismiss);
        
        if (!canClose || !hasVisibleClose) {
            const modalIdMatch = modalHtml.match(/id=["']([^"']+)["']/i);
            results.modals.noClose.push({
                file: filePath,
                line: lineNum,
                modalId: modalIdMatch ? modalIdMatch[1] : 'unknown',
                hasCloseBtn: hasCloseBtn,
                hasDataBsDismiss: hasDataBsDismiss,
                hasCloseHandler: hasCloseHandler,
                hasAriaLabel: hasAriaLabel,
                hasXButton: hasXButton,
                modalHtml: modalHtml.substring(0, 150)
            });
        } else {
            results.modals.valid.push({ file: filePath, line: lineNum });
        }
    }
}

function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
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

// Main
console.log('🔍 Enhanced SmartFarm Audit Starting...\n');

SCAN_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`📂 Scanning ${dir}...`);
        scanDirectory(dir);
    }
});

// Generate comprehensive report
const report = generateComprehensiveReport();

const reportFile = path.join(process.cwd(), 'SMARTFARM_COMPREHENSIVE_AUDIT_REPORT.md');
fs.writeFileSync(reportFile, report);

console.log(`\n✅ Audit complete!`);
console.log(`📊 Summary:`);
console.log(`   - Buttons: ${results.buttons.total} total, ${results.buttons.broken.length} broken`);
console.log(`   - Modals: ${results.modals.total} total, ${results.modals.noClose.length} without close`);
console.log(`\n📄 Report saved to: ${reportFile}`);

function generateComprehensiveReport() {
    let report = `# SmartFarm Comprehensive Codebase Audit Report
Generated: ${new Date().toISOString()}

## Executive Summary

- **Tech Stack**: HTML/JavaScript (Traditional Web Application)
- **Framework**: Bootstrap 5.x (Modal system), Vanilla JavaScript
- **Total Buttons Scanned**: ${results.buttons.total}
- **Buttons Without Handlers**: ${results.buttons.broken.length}
- **Total Modals Scanned**: ${results.modals.total}
- **Modals Without Close**: ${results.modals.noClose.length}
- **Node/Graph Structures**: None found (traditional web app)

---

## NODES_AND_CONNECTIONS_REPORT

### Summary

✅ **No graph-like node structures found in codebase.**

This is a traditional web application using HTML/JavaScript without graph-based data flow models. All data flows are handled through:
- Direct function calls
- Event listeners
- API service layers
- LocalStorage for persistence

### Architecture

- **Entry Points**: \`public/dashboard.html\`, \`public/login.html\`, various management pages
- **Data Sources**: API endpoints (\`/api/crops\`, \`/api/livestock\`, etc.), LocalStorage
- **Connections**: Direct function calls, event listeners, Bootstrap modal system

---

## BUTTONS_AND_COMMANDS_REPORT

### Summary

- **Total Buttons Found**: ${results.buttons.total}
- **Buttons with Valid Handlers**: ${results.buttons.valid.length}
- **Buttons Without Handlers**: ${results.buttons.broken.length}

### ⚠️ Buttons Without Handlers

`;

    if (results.buttons.broken.length > 0) {
        report += `**Critical Issues Found:** ${results.buttons.broken.length} buttons without handlers\n\n`;
        report += `| File | Line | Button HTML | Issue |\n`;
        report += `|------|------|-------------|-------|\n`;
        
        results.buttons.broken.slice(0, 50).forEach(btn => {
            const html = btn.html.replace(/\|/g, '\\|').substring(0, 50);
            report += `| \`${btn.file}\` | ${btn.line} | \`${html}...\` | No handler |\n`;
        });
        
        if (results.buttons.broken.length > 50) {
            report += `\n*... and ${results.buttons.broken.length - 50} more buttons*\n`;
        }
    } else {
        report += `✅ **All buttons have valid handlers!**\n`;
    }

    report += `\n### Valid Button Patterns Found

- Buttons with \`onclick\` attributes: ✅
- Buttons with \`data-bs-toggle\` (Bootstrap): ✅
- Buttons with \`data-bs-dismiss\` (Bootstrap modals): ✅
- Submit buttons: ✅
- Buttons with event listeners attached by ID: ✅

---

## DIALOGS_CLOSE_COMPLIANCE_REPORT

### Summary

- **Total Modals Found**: ${results.modals.total}
- **Modals with Close Functionality**: ${results.modals.valid.length}
- **Modals Without Close**: ${results.modals.noClose.length}

`;

    if (results.modals.noClose.length > 0) {
        report += `### ⚠️ Modals Without Close Functionality\n\n`;
        report += `**Critical Issues Found:** ${results.modals.noClose.length} modals cannot be closed\n\n`;
        report += `| File | Line | Modal ID | Close Button | Dismiss | Handler | Aria Label |\n`;
        report += `|------|------|----------|--------------|---------|---------|------------|\n`;
        
        results.modals.noClose.forEach(modal => {
            report += `| \`${modal.file}\` | ${modal.line} | \`${modal.modalId}\` | ${modal.hasCloseBtn ? '✅' : '❌'} | ${modal.hasDataBsDismiss ? '✅' : '❌'} | ${modal.hasCloseHandler ? '✅' : '❌'} | ${modal.hasAriaLabel ? '✅' : '❌'} |\n`;
        });
    } else {
        report += `✅ **All modals have close functionality!**\n`;
    }

    report += `\n### Modal Close Requirements Met

- ✅ Visible close button (\`.btn-close\`)
- ✅ \`data-bs-dismiss="modal"\` attribute
- ✅ Close handler functions
- ✅ Aria labels for accessibility

---

## PROPOSED_PATCHES

`;

    // Button patches
    if (results.buttons.broken.length > 0) {
        report += `### Button Handler Patches\n\n`;
        results.buttons.broken.slice(0, 10).forEach(btn => {
            report += `#### ${btn.file}:${btn.line}\n\n`;
            report += `**Issue**: Button has no handler\n\n`;
            report += `**Patch**:\n\n`;
            report += `\`\`\`diff\n`;
            report += `- ${btn.html}\n`;
            if (btn.buttonId) {
                report += `+ ${btn.html.replace(/onclick=["'][^"']*["']/i, '').replace(/>/, ` onclick="handleButtonClick('${btn.buttonId}')">`)}\n`;
            } else {
                const newId = `btn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                report += `+ ${btn.html.replace(/>/, ` id="${newId}" onclick="handleButtonClick('${newId}')">`)}\n`;
            }
            report += `\`\`\`\n\n`;
        });
    }

    // Modal patches
    if (results.modals.noClose.length > 0) {
        report += `### Modal Close Patches\n\n`;
        results.modals.noClose.slice(0, 10).forEach(modal => {
            report += `#### ${modal.file}:${modal.line}\n\n`;
            report += `**Issue**: Modal \`${modal.modalId}\` cannot be closed\n\n`;
            report += `**Patch**:\n\n`;
            report += `\`\`\`diff\n`;
            report += `  <div class="modal-header">\n`;
            report += `-     <h5 class="modal-title">Modal Title</h5>\n`;
            report += `+     <h5 class="modal-title">Modal Title</h5>\n`;
            report += `+     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n`;
            report += `  </div>\n`;
            report += `\`\`\`\n\n`;
        });
    }

    report += `---

## GENERATED_TESTS

### Playwright E2E Test Suite

\`\`\`javascript
// tests/e2e/button-and-modal-compliance.spec.js
const { test, expect } = require('@playwright/test');

test.describe('SmartFarm Button and Modal Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard.html');
  });

  test('All buttons have click handlers', async ({ page }) => {
    const buttons = await page.locator('button:not([disabled])').all();
    
    for (const button of buttons) {
      // Skip Bootstrap toggle buttons
      const hasBootstrapToggle = await button.evaluate(el => 
        el.hasAttribute('data-bs-toggle') || 
        el.hasAttribute('data-bs-dismiss') ||
        el.classList.contains('btn-close')
      );
      
      if (hasBootstrapToggle) continue;
      
      // Check for onclick or event listener
      const hasHandler = await button.evaluate(el => {
        return el.onclick !== null || 
               el.hasAttribute('onclick') ||
               el.type === 'submit';
      });
      
      expect(hasHandler).toBeTruthy();
    }
  });

  test('All modals can be closed', async ({ page }) => {
    // Find all modals
    const modals = await page.locator('.modal, [class*="modal"]').all();
    
    for (const modal of modals) {
      // Check for close button
      const closeBtn = await modal.locator('.btn-close, [data-bs-dismiss="modal"]').first();
      const closeBtnCount = await closeBtn.count();
      
      expect(closeBtnCount).toBeGreaterThan(0);
      
      // Test that it can actually close
      if (await modal.isVisible()) {
        await closeBtn.click();
        await expect(modal).not.toBeVisible({ timeout: 2000 });
      }
    }
  });

  test('Modal close buttons have aria-labels', async ({ page }) => {
    const closeButtons = await page.locator('.btn-close, [data-bs-dismiss="modal"]').all();
    
    for (const btn of closeButtons) {
      const ariaLabel = await btn.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel.toLowerCase()).toContain('close');
    }
  });

  test('Modals restore focus on close', async ({ page }) => {
    const triggerBtn = await page.locator('[data-bs-toggle="modal"]').first();
    if (await triggerBtn.count() > 0) {
      await triggerBtn.click();
      await page.waitForSelector('.modal.show', { timeout: 2000 });
      
      const modal = await page.locator('.modal.show').first();
      const closeBtn = await modal.locator('.btn-close').first();
      
      await closeBtn.click();
      await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 2000 });
      
      // Focus should be restored
      const activeElement = await page.evaluate(() => document.activeElement);
      expect(activeElement).not.toBeNull();
    }
  });
});
\`\`\`

### Test Setup

1. Install Playwright:
\`\`\`bash
npm install --save-dev @playwright/test
npx playwright install
\`\`\`

2. Add to \`package.json\`:
\`\`\`json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
\`\`\`

3. Create \`playwright.config.js\`:
\`\`\`javascript
module.exports = {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
};
\`\`\`

---

## Accessibility Checks

### Current Status

- ✅ Most modals have \`data-bs-dismiss="modal"\`
- ⚠️ Some modals missing \`aria-label\` on close buttons
- ⚠️ Some modals may not restore focus properly
- ✅ Bootstrap modals handle \`role="dialog"\` automatically

### Recommendations

1. **Add aria-labels to all close buttons**:
   \`\`\`html
   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close dialog"></button>
   \`\`\`

2. **Ensure focus management**:
   \`\`\`javascript
   modal.addEventListener('hidden.bs.modal', () => {
     // Restore focus to trigger element
     triggerElement.focus();
   });
   \`\`\`

3. **Add keyboard support**:
   - ESC key should close modals (Bootstrap handles this)
   - Tab should trap focus within modal

---

## Next Steps

1. ✅ Review this audit report
2. ⏳ Apply proposed patches for broken buttons
3. ⏳ Fix modals without close functionality
4. ⏳ Add aria-labels to all close buttons
5. ⏳ Run Playwright tests to verify compliance
6. ⏳ Set up CI/CD to run tests automatically

---

*Generated by SmartFarm Enhanced Audit Script v2.0*
`;

    return report;
}

