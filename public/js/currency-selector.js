// Currency Selector Component
// Allows users to change their currency preference

class CurrencySelector {
    constructor() {
        this.selector = null;
        this.init();
    }

    init() {
        this.createSelector();
        this.attachEventListeners();
    }

    createSelector() {
        // Create currency selector dropdown
        const selectorHTML = `
            <div class="currency-selector" style="display: flex; justify-content: center; margin-bottom: 20px; padding-top: 20px;">
                <div class="dropdown">
                    <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="currencyDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-coins"></i> <span id="currentCurrencyDisplay">Loading...</span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="currencyDropdown">
                        <li><h6 class="dropdown-header">Select Currency</h6></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" data-country="United States">🇺🇸 United States - USD ($)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="Fiji">🇫🇯 Fiji - FJD (F$)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="Australia">🇦🇺 Australia - AUD (A$)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="New Zealand">🇳🇿 New Zealand - NZD (NZ$)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="Canada">🇨🇦 Canada - CAD (C$)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="United Kingdom">🇬🇧 United Kingdom - GBP (£)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="Germany">🇩🇪 Germany - EUR (€)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="France">🇫🇷 France - EUR (€)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="Japan">🇯🇵 Japan - JPY (¥)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="China">🇨🇳 China - CNY (¥)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="India">🇮🇳 India - INR (₹)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="Brazil">🇧🇷 Brazil - BRL (R$)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="South Africa">🇿🇦 South Africa - ZAR (R)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="Nigeria">🇳🇬 Nigeria - NGN (₦)</a></li>
                        <li><a class="dropdown-item" href="#" data-country="Kenya">🇰🇪 Kenya - KES (KSh)</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" data-country="Other">🌍 Other - USD ($)</a></li>
                    </ul>
                </div>
            </div>
        `;

        // Add to top of main content area instead of body end
        const mainContent = document.getElementById('mainContent') || document.getElementById('dashboardView');
        if (mainContent) {
            mainContent.insertAdjacentHTML('afterbegin', selectorHTML);
        } else {
            // Fallback to body if main content not found
            document.body.insertAdjacentHTML('afterbegin', selectorHTML);
        }
        this.selector = document.querySelector('.currency-selector');
    }

    attachEventListeners() {
        // Handle currency selection
        const dropdownItems = document.querySelectorAll('.currency-selector .dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const country = e.target.getAttribute('data-country');
                if (country) {
                    this.changeCurrency(country);
                }
            });
        });

        // Update display when currency changes
        if (window.currencyManager) {
            this.updateDisplay();
        }
    }

    changeCurrency(country) {
        if (window.currencyManager) {
            const newCurrency = window.currencyManager.setCurrencyByCountry(country);
            this.updateDisplay();
            window.currencyManager.updateCurrencyDisplays();
            
            // Show success message
            this.showMessage(`Currency changed to ${newCurrency.name} (${newCurrency.symbol})`);
        }
    }

    updateDisplay() {
        const display = document.getElementById('currentCurrencyDisplay');
        if (display && window.currencyManager) {
            const currency = window.currencyManager.currentCurrency;
            display.textContent = `${currency.symbol} ${currency.code}`;
        }
    }

    showMessage(message) {
        // Create temporary message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'alert alert-success alert-dismissible fade show';
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '70px';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translateX(-50%)';
        messageDiv.style.zIndex = '1001';
        messageDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
}

// Initialize currency selector when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for currency manager and main content to be ready
    function initCurrencySelector() {
        const mainContent = document.getElementById('mainContent') || document.getElementById('dashboardView');
        if (window.currencyManager && mainContent) {
            new CurrencySelector();
        } else {
            // Wait a bit for currency manager and main content to load
            setTimeout(initCurrencySelector, 100);
        }
    }
    initCurrencySelector();
});
