/**
 * SmartFarm Favicon Generator
 * Generates all favicon sizes from the logo image
 * 
 * Usage: node generate-favicons.js
 * 
 * Requirements:
 * - Node.js installed
 * - sharp package: npm install sharp
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.error('❌ Error: sharp package not found.');
    console.log('📦 Please install it by running: npm install sharp');
    console.log('   Or use the web-based generator at: public/generate-favicons.html');
    process.exit(1);
}

const logoPath = path.join(__dirname, 'public', 'images', 'logo', 'logo.png');
const outputDir = path.join(__dirname, 'public', 'images', 'favicon');

// Favicon sizes to generate
const faviconSizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 64, name: 'favicon-64x64.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
];

async function generateFavicons() {
    console.log('🌱 SmartFarm Favicon Generator\n');
    
    // Check if logo exists
    if (!fs.existsSync(logoPath)) {
        console.error(`❌ Logo not found at: ${logoPath}`);
        console.log('   Please ensure the logo file exists at: public/images/logo/logo.png');
        process.exit(1);
    }
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`✅ Created directory: ${outputDir}`);
    }
    
    console.log(`📸 Loading logo from: ${logoPath}`);
    
    try {
        // Load and process logo
        const image = sharp(logoPath);
        const metadata = await image.metadata();
        console.log(`   Logo dimensions: ${metadata.width}x${metadata.height}`);
        
        // Generate each favicon size
        console.log('\n🎨 Generating favicons...\n');
        
        for (const { size, name } of faviconSizes) {
            const outputPath = path.join(outputDir, name);
            
            // Resize with padding (10% padding for better appearance)
            const padding = Math.floor(size * 0.1);
            const drawSize = size - (padding * 2);
            
            await image
                .clone()
                .resize(drawSize, drawSize, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
                })
                .extend({
                    top: padding,
                    bottom: padding,
                    left: padding,
                    right: padding,
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toFile(outputPath);
            
            console.log(`   ✅ Generated: ${name} (${size}x${size})`);
        }
        
        // Generate favicon.ico (32x32)
        const icoPath = path.join(outputDir, 'favicon.ico');
        await image
            .clone()
            .resize(32, 32, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toFile(icoPath);
        
        console.log(`   ✅ Generated: favicon.ico (32x32)\n`);
        
        console.log('✅ All favicons generated successfully!');
        console.log(`📁 Files saved to: ${outputDir}\n`);
        console.log('📋 Generated files:');
        faviconSizes.forEach(({ name, size }) => {
            console.log(`   - ${name} (${size}x${size})`);
        });
        console.log('   - favicon.ico (32x32)\n');
        console.log('🚀 Next steps:');
        console.log('   1. Clear your browser cache (Ctrl+F5)');
        console.log('   2. Refresh your website');
        console.log('   3. Check browser tab - you should see the SmartFarm favicon!');
        
    } catch (error) {
        console.error('❌ Error generating favicons:', error.message);
        if (error.code === 'ENOENT') {
            console.error('   File not found. Please check the logo path.');
        } else if (error.code === 'ERR_INVALID_ARG_TYPE') {
            console.error('   Invalid image format. Please ensure logo.png is a valid image file.');
        }
        process.exit(1);
    }
}

// Run the generator
generateFavicons().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});

