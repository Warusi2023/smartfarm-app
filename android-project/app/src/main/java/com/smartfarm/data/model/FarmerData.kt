package com.smartfarm.data.model

import java.util.Date

/**
 * Comprehensive farmer data model matching the enhanced web registration form
 */
data class FarmerData(
    // Personal Information
    val firstName: String = "",
    val lastName: String = "",
    val email: String = "",
    val phone: String = "",
    val username: String = "",
    
    // Location Information
    val country: String = "",
    val region: String = "",
    val district: String = "",
    val village: String = "",
    
    // Farm Information
    val farmName: String = "",
    val farmSize: Double = 0.0,
    val farmType: FarmType = FarmType.MIXED,
    val experience: ExperienceLevel = ExperienceLevel.BEGINNER,
    val crops: String = "",
    val irrigation: IrrigationMethod = IrrigationMethod.RAINFED,
    
    // Additional Information
    val education: EducationLevel = EducationLevel.SECONDARY,
    val income: IncomeRange = IncomeRange.UNDER_10K,
    val marketing: MarketingChannel = MarketingChannel.LOCAL_MARKET,
    val technology: TechnologyUsage = TechnologyUsage.BASIC,
    val challenges: String = "",
    val goals: String = "",
    val newsletter: Boolean = false,
    
    // Registration metadata
    val registrationDate: Date = Date(),
    val userAgent: String = ""
)

enum class FarmType {
    VEGETABLE, FRUIT, LIVESTOCK, MIXED, DAIRY, POULTRY, AQUACULTURE, HORTICULTURE, FLORICULTURE, OTHER
}

enum class ExperienceLevel {
    BEGINNER, INTERMEDIATE, EXPERIENCED, EXPERT
}

enum class IrrigationMethod {
    RAINFED, DRIP, SPRINKLER, FLOOD, MANUAL, MIXED
}

enum class EducationLevel {
    PRIMARY, SECONDARY, DIPLOMA, BACHELOR, MASTER, PHD
}

enum class IncomeRange {
    UNDER_10K, RANGE_10K_25K, RANGE_25K_50K, RANGE_50K_100K, RANGE_100K_250K, OVER_250K
}

enum class MarketingChannel {
    LOCAL_MARKET, SUPERMARKETS, RESTAURANTS, EXPORT, DIRECT_SALE, COOPERATIVE, ONLINE
}

enum class TechnologyUsage {
    BASIC, INTERMEDIATE, ADVANCED, EXPERT
}

/**
 * Country enum for global countries
 */
enum class Country {
    // Pacific Islands (original)
    FIJI, AUSTRALIA, NEW_ZEALAND, PAPUA_NEW_GUINEA, SOLOMON_ISLANDS, 
    VANUATU, SAMOA, TONGA, COOK_ISLANDS, FRENCH_POLYNESIA, NEW_CALEDONIA,
    
    // North America
    UNITED_STATES, CANADA, MEXICO, GUATEMALA, BELIZE, EL_SALVADOR, HONDURAS,
    NICARAGUA, COSTA_RICA, PANAMA, CUBA, JAMAICA, HAITI, DOMINICAN_REPUBLIC,
    TRINIDAD_AND_TOBAGO, BARBADOS, BAHAMAS,
    
    // South America
    BRAZIL, ARGENTINA, CHILE, PERU, COLOMBIA, VENEZUELA, ECUADOR, BOLIVIA,
    PARAGUAY, URUGUAY, GUYANA, SURINAME, FRENCH_GUIANA,
    
    // Europe
    UNITED_KINGDOM, IRELAND, FRANCE, GERMANY, ITALY, SPAIN, PORTUGAL,
    NETHERLANDS, BELGIUM, SWITZERLAND, AUSTRIA, SWEDEN, NORWAY, DENMARK,
    FINLAND, POLAND, CZECH_REPUBLIC, HUNGARY, ROMANIA, BULGARIA, CROATIA,
    SLOVENIA, SLOVAKIA, ESTONIA, LATVIA, LITHUANIA, GREECE, CYPRUS, MALTA,
    LUXEMBOURG, ICELAND, ALBANIA, MONTENEGRO, SERBIA, BOSNIA_HERZEGOVINA,
    NORTH_MACEDONIA, MOLDOVA, UKRAINE, BELARUS, RUSSIA,
    
    // Asia
    CHINA, JAPAN, SOUTH_KOREA, NORTH_KOREA, INDIA, PAKISTAN, BANGLADESH,
    SRI_LANKA, NEPAL, BHUTAN, MALDIVES, AFGHANISTAN, IRAN, IRAQ, ISRAEL,
    PALESTINE, JORDAN, LEBANON, SYRIA, TURKEY, SAUDI_ARABIA, UAE, QATAR,
    KUWAIT, BAHRAIN, OMAN, YEMEN, THAILAND, VIETNAM, CAMBODIA, LAOS,
    MYANMAR, MALAYSIA, SINGAPORE, INDONESIA, PHILIPPINES, BRUNEI, TIMOR_LESTE,
    MONGOLIA, KAZAKHSTAN, UZBEKISTAN, TURKMENISTAN, TAJIKISTAN, KYRGYZSTAN,
    
    // Africa
    SOUTH_AFRICA, EGYPT, NIGERIA, KENYA, ETHIOPIA, GHANA, MOROCCO, ALGERIA,
    TUNISIA, LIBYA, SUDAN, SOUTH_SUDAN, UGANDA, TANZANIA, ZIMBABWE, ZAMBIA,
    BOTSWANA, NAMIBIA, ANGOLA, MOZAMBIQUE, MADAGASCAR, MAURITIUS, SEYCHELLES,
    RWANDA, BURUNDI, MALAWI, LESOTHO, SWAZILAND, CAMEROON, GABON, CONGO,
    DEMOCRATIC_REPUBLIC_CONGO, CENTRAL_AFRICAN_REPUBLIC, CHAD, NIGER, MALI,
    BURKINA_FASO, SENEGAL, GAMBIA, GUINEA, SIERRA_LEONE, LIBERIA, IVORY_COAST,
    GHANA, TOGO, BENIN, CAPE_VERDE, SAO_TOME_PRINCIPE, EQUATORIAL_GUINEA,
    
    // Middle East
    TURKEY, IRAN, IRAQ, SAUDI_ARABIA, UAE, QATAR, KUWAIT, BAHRAIN, OMAN,
    YEMEN, ISRAEL, PALESTINE, JORDAN, LEBANON, SYRIA, CYPRUS,
    
    // Other
    OTHER
}
