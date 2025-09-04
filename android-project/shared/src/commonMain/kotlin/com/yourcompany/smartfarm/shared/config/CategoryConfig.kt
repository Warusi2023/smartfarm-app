package com.yourcompany.smartfarm.shared.config

/**
 * Configurable categories for farm management
 * Modify these to match your specific farm needs
 */
object CategoryConfig {
    
    // Crop Categories
    object Crops {
        val GRAINS = listOf("corn", "wheat", "barley", "oats", "rice", "sorghum", "millet")
        val LEGUMES = listOf("soybean", "peas", "beans", "lentils", "chickpeas", "alfalfa")
        val VEGETABLES = listOf("tomato", "lettuce", "carrot", "potato", "onion", "pepper", "cucumber")
        val FRUITS = listOf("apple", "orange", "peach", "strawberry", "blueberry", "raspberry")
        val HERBS = listOf("basil", "mint", "rosemary", "thyme", "oregano", "sage", "parsley")
        val FLOWERS = listOf("rose", "tulip", "sunflower", "daisy", "lily", "orchid", "marigold")
        val TREES = listOf("apple", "orange", "peach", "cherry", "plum", "pear", "apricot")
        val NUTS = listOf("almond", "walnut", "pecan", "hazelnut", "pistachio", "cashew")
        val ROOTS = listOf("carrot", "potato", "sweet potato", "turnip", "radish", "beet")
        val LEAFY_GREENS = listOf("lettuce", "spinach", "kale", "chard", "collard", "arugula")
        
        // Custom categories - add your specific crops here
        val ORGANIC = listOf("organic", "natural", "pesticide-free")
        val HEIRLOOM = listOf("heirloom", "heritage", "traditional")
        val HYBRID = listOf("hybrid", "cross-bred", "improved")
        val SEASONAL = listOf("spring", "summer", "fall", "winter", "early", "late")
        val PERENNIAL = listOf("tree", "bush", "vine", "perennial", "long-term")
        val ANNUAL = listOf("annual", "yearly", "seasonal", "temporary")
        
        // Modern farming categories
        val HYDROPONIC = listOf("hydroponic", "hydroponics", "soilless", "water-based")
        val VERTICAL = listOf("vertical", "tower", "stacked", "multi-level")
        val AEROPONIC = listOf("aeroponic", "aeroponics", "air-grown", "mist-grown")
        val MICROGREENS = listOf("microgreen", "microgreens", "sprout", "baby green")
        val MEDICINAL = listOf("medicinal", "herbal", "therapeutic", "healing")
        val SPICE = listOf("spice", "seasoning", "condiment", "flavoring")
        val TEA = listOf("tea", "camellia", "herbal tea", "infusion")
        val COFFEE = listOf("coffee", "arabica", "robusta", "coffee bean")
        val CACAO = listOf("cacao", "chocolate", "cocoa", "theobroma")
        val VANILLA = listOf("vanilla", "vanilla bean", "orchid", "flavoring")
        val SAFFRON = listOf("saffron", "crocus", "spice", "expensive")
        val TRUFFLE = listOf("truffle", "fungus", "underground", "delicacy")
        val MUSHROOM = listOf("mushroom", "fungi", "mycelium", "edible fungus")
        val ALGAE = listOf("algae", "spirulina", "chlorella", "seaweed")
        val AQUAPONIC = listOf("aquaponic", "aquaponics", "fish-plant", "symbiotic")
    }
    
    // Livestock Categories
    object Livestock {
        val CATTLE = listOf("cow", "bull", "calf", "heifer", "steer")
        val POULTRY = listOf("chicken", "turkey", "duck", "goose", "quail", "pheasant")
        val GOATS = listOf("goat", "kid", "doe", "buck")
        val HORSES = listOf("horse", "mare", "stallion", "foal", "gelding")
        val SHEEP = listOf("sheep", "lamb", "ewe", "ram")
        val PIGS = listOf("pig", "hog", "sow", "boar", "piglet")
        val FISH = listOf("fish", "trout", "salmon", "tilapia", "catfish", "bass")
        val BEES = listOf("bee", "honeybee", "bumblebee", "queen", "worker", "drone")
        val PETS = listOf("dog", "cat", "rabbit", "hamster", "guinea pig")
        val EXOTIC = listOf("llama", "alpaca", "emu", "ostrich", "deer", "elk")
        
        // Custom categories
        val DAIRY = listOf("dairy", "milk", "cheese", "yogurt")
        val MEAT = listOf("meat", "beef", "pork", "lamb", "chicken")
        val EGG_LAYING = listOf("egg", "laying", "productive", "breeder")
        val WORKING = listOf("working", "draft", "herding", "guard")
        
        // Modern farming categories
        val INSECTS = listOf("insect", "cricket", "mealworm", "black soldier fly", "silkworm")
        val CRUSTACEANS = listOf("crustacean", "shrimp", "crayfish", "lobster", "crab")
        val MOLLUSKS = listOf("mollusk", "oyster", "mussel", "clam", "snail")
        val REPTILES = listOf("reptile", "turtle", "lizard", "snake", "gecko")
        val AMPHIBIANS = listOf("amphibian", "frog", "toad", "salamander", "newt")
        val BIRDS_OF_PREY = listOf("raptor", "eagle", "hawk", "falcon", "owl")
        val WATERFOWL = listOf("waterfowl", "duck", "goose", "swan", "pelican")
        val GAME_BIRDS = listOf("game bird", "pheasant", "quail", "partridge", "grouse")
        val RODENTS = listOf("rodent", "rabbit", "hamster", "guinea pig", "rat")
        val CAMELIDS = listOf("camelid", "llama", "alpaca", "camel", "vicuña")
        val DEER_FAMILY = listOf("deer", "elk", "moose", "caribou", "reindeer")
        val ANTELOPE = listOf("antelope", "gazelle", "impala", "springbok", "oryx")
    }
    
    // Equipment Categories
    object Equipment {
        val TRACTORS = listOf("tractor", "combine", "harvester", "planter")
        val IRRIGATION = listOf("irrigation", "drip", "sprinkler", "pump", "hose")
        val GREENHOUSE = listOf("greenhouse", "polyhouse", "shade house", "tunnel")
        val TOOLS = listOf("shovel", "rake", "hoe", "pruner", "shears", "saw")
        val MACHINERY = listOf("mill", "grinder", "mixer", "conveyor", "elevator")
        val MONITORING = listOf("sensor", "camera", "thermometer", "hygrometer", "ph meter")
        val STORAGE = listOf("silo", "barn", "warehouse", "container", "tank")
        val TRANSPORT = listOf("truck", "trailer", "wagon", "cart", "wheelbarrow")
        
        // Custom categories
        val AUTOMATION = listOf("automated", "robotic", "smart", "ai-powered")
        val SOLAR = listOf("solar", "renewable", "green energy", "sustainable")
        val PRECISION = listOf("precision", "gps", "mapping", "variable rate")
        
        // Smart farming categories
        val DRONES = listOf("drone", "uav", "quadcopter", "aerial", "flying")
        val ROBOTICS = listOf("robot", "robotic", "automated", "mechanical", "arm")
        val SENSORS = listOf("sensor", "detector", "monitor", "probe", "gauge")
        val CAMERAS = listOf("camera", "imaging", "surveillance", "monitoring", "recording")
        val IOT_DEVICES = listOf("iot", "internet of things", "connected", "wireless", "smart")
        val AI_SYSTEMS = listOf("ai", "artificial intelligence", "machine learning", "neural network")
        val BLOCKCHAIN = listOf("blockchain", "distributed ledger", "cryptocurrency", "smart contract")
        val CLOUD_SYSTEMS = listOf("cloud", "remote", "online", "web-based", "saas")
        val MOBILE_APPS = listOf("mobile", "app", "smartphone", "tablet", "portable")
        val WEARABLE_TECH = listOf("wearable", "smartwatch", "fitness tracker", "headset", "glasses")
    }
    
    // Task Categories
    object Tasks {
        val PLANTING = listOf("planting", "seeding", "transplanting", "germination")
        val HARVESTING = listOf("harvesting", "picking", "collecting", "gathering")
        val MAINTENANCE = listOf("maintenance", "repair", "service", "cleaning")
        val FEEDING = listOf("feeding", "watering", "nutrition", "supplement")
        val HEALTH = listOf("health", "vaccination", "treatment", "checkup")
        val MONITORING = listOf("monitoring", "inspection", "observation", "tracking")
        val MARKETING = listOf("marketing", "sales", "advertising", "promotion")
        val ADMINISTRATION = listOf("administration", "planning", "scheduling", "record-keeping")
        
        // Custom categories
        val SUSTAINABILITY = listOf("sustainability", "organic", "regenerative", "conservation")
        val RESEARCH = listOf("research", "experiment", "trial", "study", "analysis")
        val TRAINING = listOf("training", "education", "workshop", "certification")
    }
    
    // Financial Categories
    object Financial {
        val INCOME = listOf("income", "revenue", "sales", "earnings", "profit")
        val EXPENSES = listOf("expenses", "costs", "payments", "bills", "fees")
        val INVESTMENTS = listOf("investment", "equipment", "infrastructure", "expansion")
        val LOANS = listOf("loan", "mortgage", "credit", "debt", "financing")
        val GRANTS = listOf("grant", "subsidy", "assistance", "funding", "support")
        val INSURANCE = listOf("insurance", "coverage", "protection", "liability")
        
        // Custom categories
        val SUSTAINABILITY_FUNDS = listOf("sustainability", "green", "environmental", "conservation")
        val RESEARCH_FUNDS = listOf("research", "development", "innovation", "technology")
        val EDUCATION_FUNDS = listOf("education", "training", "workshop", "outreach")
    }
    
    /**
     * Get all crop categories
     */
    fun getAllCropCategories(): Map<String, List<String>> {
        return mapOf(
            "Grains" to Crops.GRAINS,
            "Legumes" to Crops.LEGUMES,
            "Vegetables" to Crops.VEGETABLES,
            "Fruits" to Crops.FRUITS,
            "Herbs" to Crops.HERBS,
            "Flowers" to Crops.FLOWERS,
            "Trees" to Crops.TREES,
            "Nuts" to Crops.NUTS,
            "Roots" to Crops.ROOTS,
            "Leafy Greens" to Crops.LEAFY_GREENS,
            "Organic" to Crops.ORGANIC,
            "Heirloom" to Crops.HEIRLOOM,
            "Hybrid" to Crops.HYBRID,
            "Seasonal" to Crops.SEASONAL,
            "Perennial" to Crops.PERENNIAL,
            "Annual" to Crops.ANNUAL,
            "Hydroponic" to Crops.HYDROPONIC,
            "Vertical" to Crops.VERTICAL,
            "Aeroponic" to Crops.AEROPONIC,
            "Microgreens" to Crops.MICROGREENS,
            "Medicinal" to Crops.MEDICINAL,
            "Spice" to Crops.SPICE,
            "Tea" to Crops.TEA,
            "Coffee" to Crops.COFFEE,
            "Cacao" to Crops.CACAO,
            "Vanilla" to Crops.VANILLA,
            "Saffron" to Crops.SAFFRON,
            "Truffle" to Crops.TRUFFLE,
            "Mushroom" to Crops.MUSHROOM,
            "Algae" to Crops.ALGAE,
            "Aquaponic" to Crops.AQUAPONIC
        )
    }
    
    /**
     * Get all livestock categories
     */
    fun getAllLivestockCategories(): Map<String, List<String>> {
        return mapOf(
            "Cattle" to Livestock.CATTLE,
            "Poultry" to Livestock.POULTRY,
            "Goats" to Livestock.GOATS,
            "Horses" to Livestock.HORSES,
            "Sheep" to Livestock.SHEEP,
            "Pigs" to Livestock.PIGS,
            "Fish" to Livestock.FISH,
            "Bees" to Livestock.BEES,
            "Pets" to Livestock.PETS,
            "Exotic" to Livestock.EXOTIC,
            "Dairy" to Livestock.DAIRY,
            "Meat" to Livestock.MEAT,
            "Egg Laying" to Livestock.EGG_LAYING,
            "Working" to Livestock.WORKING,
            "Insects" to Livestock.INSECTS,
            "Crustaceans" to Livestock.CRUSTACEANS,
            "Mollusks" to Livestock.MOLLUSKS,
            "Reptiles" to Livestock.REPTILES,
            "Amphibians" to Livestock.AMPHIBIANS,
            "Birds of Prey" to Livestock.BIRDS_OF_PREY,
            "Waterfowl" to Livestock.WATERFOWL,
            "Game Birds" to Livestock.GAME_BIRDS,
            "Rodents" to Livestock.RODENTS,
            "Camelids" to Livestock.CAMELIDS,
            "Deer Family" to Livestock.DEER_FAMILY,
            "Antelope" to Livestock.ANTELOPE
        )
    }
    
    /**
     * Get all equipment categories
     */
    fun getAllEquipmentCategories(): Map<String, List<String>> {
        return mapOf(
            "Tractors" to Equipment.TRACTORS,
            "Irrigation" to Equipment.IRRIGATION,
            "Greenhouse" to Equipment.GREENHOUSE,
            "Tools" to Equipment.TOOLS,
            "Machinery" to Equipment.MACHINERY,
            "Monitoring" to Equipment.MONITORING,
            "Storage" to Equipment.STORAGE,
            "Transport" to Equipment.TRANSPORT,
            "Automation" to Equipment.AUTOMATION,
            "Solar" to Equipment.SOLAR,
            "Precision" to Equipment.PRECISION,
            "Drones" to Equipment.DRONES,
            "Robotics" to Equipment.ROBOTICS,
            "Sensors" to Equipment.SENSORS,
            "Cameras" to Equipment.CAMERAS,
            "IOT Devices" to Equipment.IOT_DEVICES,
            "AI Systems" to Equipment.AI_SYSTEMS,
            "Blockchain" to Equipment.BLOCKCHAIN,
            "Cloud Systems" to Equipment.CLOUD_SYSTEMS,
            "Mobile Apps" to Equipment.MOBILE_APPS,
            "Wearable Tech" to Equipment.WEARABLE_TECH
        )
    }
    
    /**
     * Add custom category
     */
    fun addCustomCategory(type: String, name: String, keywords: List<String>) {
        println("➕ Adding custom category: $name ($type) with keywords: $keywords")
        // In a real implementation, this would be stored persistently
    }
    
    /**
     * Remove custom category
     */
    fun removeCustomCategory(type: String, name: String) {
        println("➖ Removing custom category: $name ($type)")
        // In a real implementation, this would be stored persistently
    }
}
