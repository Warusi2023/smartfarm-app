// SmartFarm Ads Provider
// Handles AdSense and affiliate ad integration

class AdsProvider {
    constructor() {
        this.adsenseClientId = this.getEnvironmentVariable('ADSENSE_CLIENT_ID');
        this.adsenseEnabled = this.getEnvironmentVariable('ADSENSE_ENABLED') === 'true';
        this.affiliateEnabled = this.getEnvironmentVariable('AFFILIATE_ENABLED') === 'true';
        this.affiliateTag = this.getEnvironmentVariable('AFFILIATE_TAG') || '';
        
        this.init();
    }

    init() {
        console.log('📢 Ads Provider initialized');
        console.log('AdSense enabled:', this.adsenseEnabled);
        console.log('Affiliate enabled:', this.affiliateEnabled);
        
        if (this.adsenseEnabled && this.adsenseClientId) {
            this.loadAdSense();
        }
    }

    getEnvironmentVariable(name) {
        // Check for environment variables in different ways
        // 1. Check if running in production with Netlify env vars
        if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
            // In production, these would be set by Netlify
            return window[name] || '';
        }
        
        // 2. Check localStorage for development/testing
        const localValue = localStorage.getItem(`smartfarm_${name.toLowerCase()}`);
        if (localValue) {
            return localValue;
        }
        
        // 3. Default values for development
        const defaults = {
            'ADSENSE_CLIENT_ID': '',
            'ADSENSE_ENABLED': 'false',
            'AFFILIATE_ENABLED': 'false',
            'AFFILIATE_TAG': ''
        };
        
        return defaults[name] || '';
    }

    loadAdSense() {
        try {
            if (!this.adsenseClientId) {
                console.warn('⚠️ AdSense client ID not provided');
                return;
            }

            const scriptId = 'adsbygoogle-script';
            if (document.getElementById(scriptId)) {
                console.log('✅ AdSense script already loaded');
                return;
            }
        } catch (error) {
            console.warn('⚠️ Error loading AdSense:', error.message);
            return;
        }

        try {
            console.log('📢 Loading AdSense script...');
            
            const script = document.createElement('script');
            script.id = scriptId;
            script.async = true;
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.adsenseClientId}`;
            script.crossOrigin = 'anonymous';
            
            script.onload = () => {
                try {
                    console.log('✅ AdSense script loaded successfully');
                    this.initializeAdSense();
                } catch (error) {
                    console.warn('⚠️ Error initializing AdSense:', error.message);
                }
            };
            
            script.onerror = () => {
                console.warn('⚠️ Failed to load AdSense script - ad blocker may be active');
            };
            
            document.head.appendChild(script);
        } catch (error) {
            console.warn('⚠️ Error loading AdSense script:', error.message);
        }
    }

    initializeAdSense() {
        // Initialize AdSense after script loads
        if (typeof adsbygoogle !== 'undefined') {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
                console.log('✅ AdSense initialized');
            } catch (error) {
                console.error('❌ Error initializing AdSense:', error);
            }
        }
    }

    createAdBox(options = {}) {
        if (!this.adsenseEnabled) {
            return this.createPlaceholderAd(options);
        }

        const adBox = document.createElement('ins');
        adBox.className = 'adsbygoogle';
        adBox.style.display = 'block';
        adBox.setAttribute('data-ad-client', this.adsenseClientId);
        adBox.setAttribute('data-ad-slot', options.slot || 'auto');
        adBox.setAttribute('data-ad-format', options.format || 'auto');
        adBox.setAttribute('data-full-width-responsive', 'true');
        
        // Add custom styling
        if (options.className) {
            adBox.className += ` ${options.className}`;
        }
        
        if (options.style) {
            Object.assign(adBox.style, options.style);
        }

        // Initialize the ad
        setTimeout(() => {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error('❌ Error pushing ad to AdSense:', error);
            }
        }, 100);

        return adBox;
    }

    createPlaceholderAd(options = {}) {
        const placeholder = document.createElement('div');
        placeholder.className = `ad-placeholder ${options.className || ''}`;
        placeholder.style.cssText = `
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            color: #6c757d;
            font-size: 14px;
            margin: 10px 0;
            ${options.style || ''}
        `;
        placeholder.innerHTML = `
            <i class="fas fa-ad" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
            <div>Ad Space</div>
            <small>AdSense disabled in development</small>
        `;
        return placeholder;
    }

    createAffiliateCard(cardData) {
        if (!this.affiliateEnabled) {
            return null;
        }

        const card = document.createElement('div');
        card.className = 'affiliate-card';
        card.style.cssText = `
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
            margin: 10px 0;
            transition: transform 0.2s ease;
        `;

        card.innerHTML = `
            <a href="${cardData.link}" target="_blank" rel="sponsored noopener noreferrer" 
               style="text-decoration: none; color: inherit; display: block;">
                <div style="position: relative;">
                    <img src="${cardData.imgUrl}" alt="${cardData.title}" 
                         style="width: 100%; height: 160px; object-fit: cover;">
                    <div style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); 
                                color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                        Sponsored
                    </div>
                </div>
                <div style="padding: 15px;">
                    <div style="font-weight: 600; margin-bottom: 5px;">${cardData.title}</div>
                    <div style="font-size: 14px; color: #666;">${cardData.description || ''}</div>
                    ${cardData.price ? `<div style="font-weight: 600; color: #28a745; margin-top: 8px;">${cardData.price}</div>` : ''}
                </div>
            </a>
        `;

        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        return card;
    }

    // Get affiliate cards for different categories
    getAffiliateCards(category = 'general') {
        const cards = {
            'seeds': [
                {
                    title: 'Premium Vegetable Seeds',
                    imgUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
                    link: `https://amazon.com/dp/B08XYZ123?tag=${this.affiliateTag}`,
                    description: 'High-quality seeds for your farm',
                    price: '$24.99'
                },
                {
                    title: 'Organic Fertilizer',
                    imgUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=300&h=200&fit=crop',
                    link: `https://amazon.com/dp/B08ABC456?tag=${this.affiliateTag}`,
                    description: 'Natural fertilizer for healthy crops',
                    price: '$39.99'
                }
            ],
            'tools': [
                {
                    title: 'Farm Irrigation System',
                    imgUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop',
                    link: `https://amazon.com/dp/B08DEF789?tag=${this.affiliateTag}`,
                    description: 'Automated watering system',
                    price: '$149.99'
                },
                {
                    title: 'Garden Tools Set',
                    imgUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
                    link: `https://amazon.com/dp/B08GHI012?tag=${this.affiliateTag}`,
                    description: 'Professional gardening tools',
                    price: '$79.99'
                }
            ],
            'livestock': [
                {
                    title: 'Livestock Feed',
                    imgUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop',
                    link: `https://amazon.com/dp/B08JKL345?tag=${this.affiliateTag}`,
                    description: 'Nutritious feed for healthy animals',
                    price: '$89.99'
                }
            ],
            'general': [
                {
                    title: 'Smart Farm Monitor',
                    imgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
                    link: `https://amazon.com/dp/B08MNO678?tag=${this.affiliateTag}`,
                    description: 'IoT sensors for farm monitoring',
                    price: '$199.99'
                }
            ]
        };

        return cards[category] || cards['general'];
    }

    // Insert ads into specific locations
    insertSidebarAds() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        // Create ads container
        const adsContainer = document.createElement('div');
        adsContainer.className = 'sidebar-ads';
        adsContainer.style.cssText = `
            margin-top: 20px;
            padding: 15px;
        `;

        // Add AdSense ad
        const adBox = this.createAdBox({
            className: 'sidebar-ad',
            style: 'margin-bottom: 20px;'
        });
        adsContainer.appendChild(adBox);

        // Add affiliate cards
        if (this.affiliateEnabled) {
            const affiliateCards = this.getAffiliateCards('general');
            affiliateCards.slice(0, 2).forEach(cardData => {
                const card = this.createAffiliateCard(cardData);
                if (card) {
                    adsContainer.appendChild(card);
                }
            });
        }

        sidebar.appendChild(adsContainer);
    }

    insertContentAds() {
        // Insert ads between content sections
        const contentSections = document.querySelectorAll('.dashboard-card, .main-content > div');
        
        contentSections.forEach((section, index) => {
            if (index > 0 && index % 3 === 0) { // Every 3rd section
                const adBox = this.createAdBox({
                    className: 'content-ad',
                    style: 'margin: 20px 0; text-align: center;'
                });
                
                section.parentNode.insertBefore(adBox, section);
            }
        });
    }

    // Development helpers
    enableDevelopmentMode() {
        console.log('🔧 Enabling ads development mode');
        localStorage.setItem('smartfarm_adsense_enabled', 'true');
        localStorage.setItem('smartfarm_affiliate_enabled', 'true');
        localStorage.setItem('smartfarm_adsense_client_id', 'ca-pub-1234567890123456'); // Demo ID
        localStorage.setItem('smartfarm_affiliate_tag', 'smartfarm-20'); // Demo tag
    }

    disableDevelopmentMode() {
        console.log('🔧 Disabling ads development mode');
        localStorage.removeItem('smartfarm_adsense_enabled');
        localStorage.removeItem('smartfarm_affiliate_enabled');
        localStorage.removeItem('smartfarm_adsense_client_id');
        localStorage.removeItem('smartfarm_affiliate_tag');
    }
}

// Initialize ads provider
window.adsProvider = new AdsProvider();

// Global functions for easy access
window.createAdBox = (options) => window.adsProvider.createAdBox(options);
window.createAffiliateCard = (data) => window.adsProvider.createAffiliateCard(data);
window.insertSidebarAds = () => window.adsProvider.insertSidebarAds();
window.insertContentAds = () => window.adsProvider.insertContentAds();

// Development helpers
window.enableAdsDev = () => window.adsProvider.enableDevelopmentMode();
window.disableAdsDev = () => window.adsProvider.disableDevelopmentMode();

console.log('📢 SmartFarm Ads Provider loaded');
