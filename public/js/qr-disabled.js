/**
 * SmartFarm QR Code Functionality - Disabled
 * QR code features temporarily disabled to prevent CDN errors
 */

(function() {
    'use strict';
    
    // Stub out QR Code functionality to prevent errors
    window.QRCode = {
        toCanvas: function() {
            console.warn('QR Code functionality temporarily disabled');
            return Promise.resolve();
        },
        toDataURL: function() {
            console.warn('QR Code functionality temporarily disabled');
            return Promise.resolve('data:image/png;base64,');
        },
        toString: function() {
            console.warn('QR Code functionality temporarily disabled');
            return Promise.resolve('<svg></svg>');
        }
    };
    
    // Stub out global QR methods if they exist
    if (window.smartFarm) {
        window.smartFarm.scanQRCode = function() {
            alert('QR Code scanning is temporarily disabled. This feature will be available soon!');
        };
        
        window.smartFarm.generateAllQRCodes = function() {
            alert('QR Code generation is temporarily disabled. This feature will be available soon!');
        };
        
        window.smartFarm.generateQRCode = function() {
            alert('QR Code generation is temporarily disabled. This feature will be available soon!');
        };
    }
    
    console.log('[QR Code] QR Code functionality disabled (prevents CDN errors)');
    
})();

