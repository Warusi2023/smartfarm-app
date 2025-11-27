// Currency Configuration for SmartFarm
// Maps countries to their respective currencies and formatting

const CURRENCY_CONFIG = {
    // Pacific Islands
    'Fiji': { code: 'FJD', symbol: 'F$', name: 'Fijian Dollar', decimal: 2 },
    'Australia': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', decimal: 2 },
    'New Zealand': { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', decimal: 2 },
    'Papua New Guinea': { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina', decimal: 2 },
    'Solomon Islands': { code: 'SBD', symbol: 'SI$', name: 'Solomon Islands Dollar', decimal: 2 },
    'Vanuatu': { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu', decimal: 0 },
    'Samoa': { code: 'WST', symbol: 'WS$', name: 'Samoan Tala', decimal: 2 },
    'Tonga': { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga', decimal: 2 },
    'Cook Islands': { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', decimal: 2 },
    'French Polynesia': { code: 'XPF', symbol: '₣', name: 'CFP Franc', decimal: 0 },
    'New Caledonia': { code: 'XPF', symbol: '₣', name: 'CFP Franc', decimal: 0 },

    // North America
    'United States': { code: 'USD', symbol: '$', name: 'US Dollar', decimal: 2 },
    'Canada': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', decimal: 2 },
    'Mexico': { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', decimal: 2 },
    'Guatemala': { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal', decimal: 2 },
    'Belize': { code: 'BZD', symbol: 'BZ$', name: 'Belize Dollar', decimal: 2 },
    'El Salvador': { code: 'USD', symbol: '$', name: 'US Dollar', decimal: 2 },
    'Honduras': { code: 'HNL', symbol: 'L', name: 'Honduran Lempira', decimal: 2 },
    'Nicaragua': { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba', decimal: 2 },
    'Costa Rica': { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón', decimal: 2 },
    'Panama': { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa', decimal: 2 },
    'Cuba': { code: 'CUP', symbol: '$', name: 'Cuban Peso', decimal: 2 },
    'Jamaica': { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar', decimal: 2 },
    'Haiti': { code: 'HTG', symbol: 'G', name: 'Haitian Gourde', decimal: 2 },
    'Dominican Republic': { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso', decimal: 2 },
    'Trinidad and Tobago': { code: 'TTD', symbol: 'TT$', name: 'Trinidad and Tobago Dollar', decimal: 2 },
    'Barbados': { code: 'BBD', symbol: 'Bds$', name: 'Barbadian Dollar', decimal: 2 },
    'Bahamas': { code: 'BSD', symbol: 'B$', name: 'Bahamian Dollar', decimal: 2 },

    // South America
    'Brazil': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', decimal: 2 },
    'Argentina': { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso', decimal: 2 },
    'Chile': { code: 'CLP', symbol: 'CL$', name: 'Chilean Peso', decimal: 0 },
    'Peru': { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', decimal: 2 },
    'Colombia': { code: 'COP', symbol: 'COL$', name: 'Colombian Peso', decimal: 0 },
    'Venezuela': { code: 'VES', symbol: 'Bs.S', name: 'Venezuelan Bolívar', decimal: 2 },
    'Ecuador': { code: 'USD', symbol: '$', name: 'US Dollar', decimal: 2 },
    'Bolivia': { code: 'BOB', symbol: 'Bs', name: 'Bolivian Boliviano', decimal: 2 },
    'Paraguay': { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani', decimal: 0 },
    'Uruguay': { code: 'UYU', symbol: 'UY$', name: 'Uruguayan Peso', decimal: 2 },
    'Guyana': { code: 'GYD', symbol: 'G$', name: 'Guyanese Dollar', decimal: 2 },
    'Suriname': { code: 'SRD', symbol: 'SRD', name: 'Surinamese Dollar', decimal: 2 },
    'French Guiana': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },

    // Europe
    'United Kingdom': { code: 'GBP', symbol: '£', name: 'British Pound', decimal: 2 },
    'Ireland': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'France': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Germany': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Italy': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Spain': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Portugal': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Netherlands': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Belgium': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Switzerland': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', decimal: 2 },
    'Austria': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Sweden': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', decimal: 2 },
    'Norway': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', decimal: 2 },
    'Denmark': { code: 'DKK', symbol: 'kr', name: 'Danish Krone', decimal: 2 },
    'Finland': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Poland': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', decimal: 2 },
    'Czech Republic': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', decimal: 2 },
    'Hungary': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', decimal: 0 },
    'Romania': { code: 'RON', symbol: 'lei', name: 'Romanian Leu', decimal: 2 },
    'Bulgaria': { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', decimal: 2 },
    'Croatia': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Slovenia': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Slovakia': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Estonia': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Latvia': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Lithuania': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Greece': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Cyprus': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Malta': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Luxembourg': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Iceland': { code: 'ISK', symbol: 'kr', name: 'Icelandic Krona', decimal: 0 },
    'Albania': { code: 'ALL', symbol: 'L', name: 'Albanian Lek', decimal: 2 },
    'Montenegro': { code: 'EUR', symbol: '€', name: 'Euro', decimal: 2 },
    'Serbia': { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar', decimal: 2 },
    'Bosnia and Herzegovina': { code: 'BAM', symbol: 'KM', name: 'Bosnia and Herzegovina Mark', decimal: 2 },
    'North Macedonia': { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar', decimal: 2 },
    'Moldova': { code: 'MDL', symbol: 'L', name: 'Moldovan Leu', decimal: 2 },
    'Ukraine': { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', decimal: 2 },
    'Belarus': { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble', decimal: 2 },
    'Russia': { code: 'RUB', symbol: '₽', name: 'Russian Ruble', decimal: 2 },

    // Asia
    'China': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', decimal: 2 },
    'Japan': { code: 'JPY', symbol: '¥', name: 'Japanese Yen', decimal: 0 },
    'South Korea': { code: 'KRW', symbol: '₩', name: 'South Korean Won', decimal: 0 },
    'North Korea': { code: 'KPW', symbol: '₩', name: 'North Korean Won', decimal: 2 },
    'India': { code: 'INR', symbol: '₹', name: 'Indian Rupee', decimal: 2 },
    'Pakistan': { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', decimal: 2 },
    'Bangladesh': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', decimal: 2 },
    'Sri Lanka': { code: 'LKR', symbol: '₨', name: 'Sri Lankan Rupee', decimal: 2 },
    'Nepal': { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee', decimal: 2 },
    'Bhutan': { code: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum', decimal: 2 },
    'Maldives': { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa', decimal: 2 },
    'Afghanistan': { code: 'AFN', symbol: '؋', name: 'Afghan Afghani', decimal: 2 },
    'Iran': { code: 'IRR', symbol: '﷼', name: 'Iranian Rial', decimal: 2 },
    'Iraq': { code: 'IQD', symbol: 'ع.د', name: 'Iraqi Dinar', decimal: 3 },
    'Israel': { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', decimal: 2 },
    'Palestine': { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', decimal: 2 },
    'Jordan': { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar', decimal: 3 },
    'Lebanon': { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound', decimal: 2 },
    'Syria': { code: 'SYP', symbol: 'ل.س', name: 'Syrian Pound', decimal: 2 },
    'Turkey': { code: 'TRY', symbol: '₺', name: 'Turkish Lira', decimal: 2 },
    'Saudi Arabia': { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', decimal: 2 },
    'UAE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', decimal: 2 },
    'Qatar': { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', decimal: 2 },
    'Kuwait': { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', decimal: 3 },
    'Bahrain': { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar', decimal: 3 },
    'Oman': { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial', decimal: 3 },
    'Yemen': { code: 'YER', symbol: '﷼', name: 'Yemeni Rial', decimal: 2 },
    'Thailand': { code: 'THB', symbol: '฿', name: 'Thai Baht', decimal: 2 },
    'Vietnam': { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', decimal: 0 },
    'Cambodia': { code: 'KHR', symbol: '៛', name: 'Cambodian Riel', decimal: 2 },
    'Laos': { code: 'LAK', symbol: '₭', name: 'Lao Kip', decimal: 2 },
    'Myanmar': { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat', decimal: 2 },
    'Malaysia': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', decimal: 2 },
    'Singapore': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', decimal: 2 },
    'Indonesia': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', decimal: 0 },
    'Philippines': { code: 'PHP', symbol: '₱', name: 'Philippine Peso', decimal: 2 },
    'Brunei': { code: 'BND', symbol: 'B$', name: 'Brunei Dollar', decimal: 2 },
    'Timor-Leste': { code: 'USD', symbol: '$', name: 'US Dollar', decimal: 2 },
    'Mongolia': { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik', decimal: 2 },
    'Kazakhstan': { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', decimal: 2 },
    'Uzbekistan': { code: 'UZS', symbol: 'лв', name: 'Uzbekistani Som', decimal: 2 },
    'Turkmenistan': { code: 'TMT', symbol: 'T', name: 'Turkmenistani Manat', decimal: 2 },
    'Tajikistan': { code: 'TJS', symbol: 'SM', name: 'Tajikistani Somoni', decimal: 2 },
    'Kyrgyzstan': { code: 'KGS', symbol: 'лв', name: 'Kyrgyzstani Som', decimal: 2 },

    // Africa
    'South Africa': { code: 'ZAR', symbol: 'R', name: 'South African Rand', decimal: 2 },
    'Egypt': { code: 'EGP', symbol: '£', name: 'Egyptian Pound', decimal: 2 },
    'Nigeria': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', decimal: 2 },
    'Kenya': { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', decimal: 2 },
    'Ethiopia': { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', decimal: 2 },
    'Ghana': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', decimal: 2 },
    'Morocco': { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', decimal: 2 },
    'Algeria': { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', decimal: 2 },
    'Tunisia': { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', decimal: 3 },
    'Libya': { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar', decimal: 3 },
    'Sudan': { code: 'SDG', symbol: 'ج.س.', name: 'Sudanese Pound', decimal: 2 },
    'South Sudan': { code: 'SSP', symbol: '£', name: 'South Sudanese Pound', decimal: 2 },
    'Uganda': { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', decimal: 0 },
    'Tanzania': { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', decimal: 2 },
    'Zimbabwe': { code: 'ZWL', symbol: 'Z$', name: 'Zimbabwean Dollar', decimal: 2 },
    'Zambia': { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha', decimal: 2 },
    'Botswana': { code: 'BWP', symbol: 'P', name: 'Botswana Pula', decimal: 2 },
    'Namibia': { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar', decimal: 2 },
    'Angola': { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza', decimal: 2 },
    'Mozambique': { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical', decimal: 2 },
    'Madagascar': { code: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary', decimal: 2 },
    'Mauritius': { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee', decimal: 2 },
    'Seychelles': { code: 'SCR', symbol: '₨', name: 'Seychellois Rupee', decimal: 2 },
    'Rwanda': { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc', decimal: 0 },
    'Burundi': { code: 'BIF', symbol: 'FBu', name: 'Burundian Franc', decimal: 0 },
    'Malawi': { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha', decimal: 2 },
    'Lesotho': { code: 'LSL', symbol: 'L', name: 'Lesotho Loti', decimal: 2 },
    'Swaziland': { code: 'SZL', symbol: 'L', name: 'Swazi Lilangeni', decimal: 2 },
    'Cameroon': { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', decimal: 0 },
    'Gabon': { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', decimal: 0 },
    'Congo': { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', decimal: 0 },
    'Democratic Republic of Congo': { code: 'CDF', symbol: 'FC', name: 'Congolese Franc', decimal: 2 },
    'Central African Republic': { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', decimal: 0 },
    'Chad': { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', decimal: 0 },
    'Niger': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', decimal: 0 },
    'Mali': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', decimal: 0 },
    'Burkina Faso': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', decimal: 0 },
    'Senegal': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', decimal: 0 },
    'Gambia': { code: 'GMD', symbol: 'D', name: 'Gambian Dalasi', decimal: 2 },
    'Guinea': { code: 'GNF', symbol: 'FG', name: 'Guinean Franc', decimal: 0 },
    'Sierra Leone': { code: 'SLE', symbol: 'Le', name: 'Sierra Leonean Leone', decimal: 2 },
    'Liberia': { code: 'LRD', symbol: 'L$', name: 'Liberian Dollar', decimal: 2 },
    'Ivory Coast': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', decimal: 0 },
    'Togo': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', decimal: 0 },
    'Benin': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', decimal: 0 },
    'Cape Verde': { code: 'CVE', symbol: '$', name: 'Cape Verdean Escudo', decimal: 2 },
    'Sao Tome and Principe': { code: 'STN', symbol: 'Db', name: 'São Tomé and Príncipe Dobra', decimal: 2 },
    'Equatorial Guinea': { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', decimal: 0 },

    // Default fallback
    'Other': { code: 'USD', symbol: '$', name: 'US Dollar', decimal: 2 }
};

// Currency utility functions
class CurrencyManager {
    constructor() {
        this.currentCurrency = this.getUserCurrency();
    }

    // Get user's currency based on stored country
    getUserCurrency() {
        const userData = localStorage.getItem('smartfarm_userData');
        if (userData) {
            try {
                const data = JSON.parse(userData);
                const country = data.country || data.countryName;
                if (country && CURRENCY_CONFIG[country]) {
                    return CURRENCY_CONFIG[country];
                }
            } catch (e) {
                console.log('Error parsing user data for currency:', e);
            }
        }
        
        // Fallback to USD (United States) as default
        return CURRENCY_CONFIG['United States'];
    }

    // Set currency based on country
    setCurrencyByCountry(country) {
        if (CURRENCY_CONFIG[country]) {
            this.currentCurrency = CURRENCY_CONFIG[country];
            localStorage.setItem('smartfarm_currency', JSON.stringify(this.currentCurrency));
            return this.currentCurrency;
        }
        return this.currentCurrency;
    }

    // Format amount with current currency
    formatAmount(amount) {
        const formatted = parseFloat(amount).toFixed(this.currentCurrency.decimal);
        return `${this.currentCurrency.symbol}${formatted}`;
    }

    // Format amount with specific currency
    formatAmountWithCurrency(amount, currencyCode) {
        const currency = Object.values(CURRENCY_CONFIG).find(c => c.code === currencyCode);
        if (currency) {
            const formatted = parseFloat(amount).toFixed(currency.decimal);
            return `${currency.symbol}${formatted}`;
        }
        return this.formatAmount(amount);
    }

    // Get currency symbol
    getSymbol() {
        return this.currentCurrency.symbol;
    }

    // Get currency code
    getCode() {
        return this.currentCurrency.code;
    }

    // Get currency name
    getName() {
        return this.currentCurrency.name;
    }

    // Update all currency displays on the page
    updateCurrencyDisplays() {
        // Update all elements with data-currency attribute
        const currencyElements = document.querySelectorAll('[data-currency]');
        currencyElements.forEach(element => {
            const amount = element.getAttribute('data-currency');
            if (amount) {
                element.textContent = this.formatAmount(amount);
            }
        });

        // Update all elements with data-currency-symbol attribute
        const symbolElements = document.querySelectorAll('[data-currency-symbol]');
        symbolElements.forEach(element => {
            element.textContent = this.getSymbol();
        });

        // Update all elements with data-currency-code attribute
        const codeElements = document.querySelectorAll('[data-currency-code]');
        codeElements.forEach(element => {
            element.textContent = this.getCode();
        });
    }

    // Initialize currency on page load
    init() {
        this.currentCurrency = this.getUserCurrency();
        this.updateCurrencyDisplays();
        console.log('Currency initialized:', this.currentCurrency);
    }
}

// Global currency manager instance
window.currencyManager = new CurrencyManager();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.currencyManager.init();
});
