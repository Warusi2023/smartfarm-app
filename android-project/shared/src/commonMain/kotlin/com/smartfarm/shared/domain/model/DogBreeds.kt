package com.smartfarm.shared.domain.model

import kotlinx.serialization.Serializable

/**
 * Comprehensive Dog Breeds Database
 * Organized by AKC (American Kennel Club) groups
 */
@Serializable
data class DogBreed(
    val name: String,
    val size: DogSize,
    val temperament: String,
    val lifespan: String,
    val origin: String,
    val group: DogGroup,
    val description: String = "",
    val characteristics: List<String> = emptyList()
)

@Serializable
enum class DogSize {
    TOY,       // Up to 10 inches, up to 12 lbs
    SMALL,     // 10-15 inches, 12-25 lbs
    MEDIUM,    // 15-25 inches, 25-60 lbs
    LARGE,     // 25-30 inches, 60-100 lbs
    GIANT      // Over 30 inches, over 100 lbs
}

@Serializable
enum class DogGroup {
    WORKING,
    SPORTING,
    HOUND,
    TERRIER,
    TOY,
    NON_SPORTING,
    HERDING
}

object DogBreedsDatabase {
    
    val allBreeds = listOf(
        // Working Dogs
        DogBreed("German Shepherd", DogSize.LARGE, "Confident, Courageous", "9-13 years", "Germany", DogGroup.WORKING,
            "Intelligent and versatile working dog", listOf("Loyal", "Protective", "Trainable", "Energetic")),
        DogBreed("Rottweiler", DogSize.LARGE, "Loyal, Confident", "9-10 years", "Germany", DogGroup.WORKING,
            "Powerful and protective guardian", listOf("Loyal", "Confident", "Courageous", "Calm")),
        DogBreed("Doberman Pinscher", DogSize.LARGE, "Loyal, Fearless", "10-13 years", "Germany", DogGroup.WORKING,
            "Elegant and athletic protector", listOf("Loyal", "Fearless", "Alert", "Energetic")),
        DogBreed("Boxer", DogSize.LARGE, "Playful, Devoted", "10-12 years", "Germany", DogGroup.WORKING,
            "High-spirited and fun-loving", listOf("Playful", "Devoted", "Patient", "Bright")),
        DogBreed("Great Dane", DogSize.GIANT, "Friendly, Patient", "7-10 years", "Germany", DogGroup.WORKING,
            "Gentle giant with noble bearing", listOf("Friendly", "Patient", "Dependable", "Gentle")),
        DogBreed("Mastiff", DogSize.GIANT, "Courageous, Dignified", "6-10 years", "England", DogGroup.WORKING,
            "Massive and gentle guardian", listOf("Courageous", "Dignified", "Good-natured", "Calm")),
        DogBreed("Saint Bernard", DogSize.GIANT, "Gentle, Friendly", "8-10 years", "Switzerland", DogGroup.WORKING,
            "Gentle giant and rescue dog", listOf("Gentle", "Friendly", "Patient", "Watchful")),
        DogBreed("Bernese Mountain Dog", DogSize.LARGE, "Good-natured, Calm", "7-10 years", "Switzerland", DogGroup.WORKING,
            "Hardworking farm dog", listOf("Good-natured", "Calm", "Strong", "Loyal")),
        DogBreed("Siberian Husky", DogSize.LARGE, "Loyal, Mischievous", "12-14 years", "Siberia", DogGroup.WORKING,
            "Athletic and independent sled dog", listOf("Loyal", "Mischievous", "Outgoing", "Energetic")),
        DogBreed("Alaskan Malamute", DogSize.LARGE, "Affectionate, Loyal", "10-14 years", "Alaska", DogGroup.WORKING,
            "Powerful and dignified sled dog", listOf("Affectionate", "Loyal", "Playful", "Dignified")),
        DogBreed("Akita", DogSize.LARGE, "Dignified, Courageous", "10-13 years", "Japan", DogGroup.WORKING,
            "Large and powerful Japanese breed", listOf("Dignified", "Courageous", "Loyal", "Independent")),
        DogBreed("Shiba Inu", DogSize.MEDIUM, "Alert, Active", "13-16 years", "Japan", DogGroup.WORKING,
            "Small and agile Japanese breed", listOf("Alert", "Active", "Independent", "Clean")),
        
        // Sporting Dogs
        DogBreed("Golden Retriever", DogSize.LARGE, "Friendly, Intelligent", "10-12 years", "Scotland", DogGroup.SPORTING,
            "Friendly and intelligent family dog", listOf("Friendly", "Intelligent", "Devoted", "Reliable")),
        DogBreed("Labrador Retriever", DogSize.LARGE, "Outgoing, Active", "10-14 years", "Canada", DogGroup.SPORTING,
            "Most popular breed in America", listOf("Outgoing", "Active", "Friendly", "High-spirited")),
        DogBreed("Cocker Spaniel", DogSize.MEDIUM, "Gentle, Smart", "12-15 years", "England", DogGroup.SPORTING,
            "Gentle and smart sporting dog", listOf("Gentle", "Smart", "Happy", "Adaptable")),
        DogBreed("English Springer Spaniel", DogSize.MEDIUM, "Friendly, Eager", "12-14 years", "England", DogGroup.SPORTING,
            "Energetic and friendly hunting dog", listOf("Friendly", "Eager", "Alert", "Intelligent")),
        DogBreed("Brittany", DogSize.MEDIUM, "Bright, Energetic", "12-14 years", "France", DogGroup.SPORTING,
            "Energetic and bright hunting dog", listOf("Bright", "Energetic", "Agile", "Quick")),
        DogBreed("Pointer", DogSize.LARGE, "Even-tempered, Hard-working", "12-15 years", "England", DogGroup.SPORTING,
            "Athletic and hardworking hunting dog", listOf("Even-tempered", "Hard-working", "Alert", "Active")),
        DogBreed("Weimaraner", DogSize.LARGE, "Friendly, Fearless", "10-13 years", "Germany", DogGroup.SPORTING,
            "Elegant and athletic hunting dog", listOf("Friendly", "Fearless", "Alert", "Powerful")),
        DogBreed("Vizsla", DogSize.LARGE, "Affectionate, Energetic", "12-14 years", "Hungary", DogGroup.SPORTING,
            "Energetic and affectionate hunting dog", listOf("Affectionate", "Energetic", "Gentle", "Lively")),
        DogBreed("Irish Setter", DogSize.LARGE, "Outgoing, Sweet-natured", "12-15 years", "Ireland", DogGroup.SPORTING,
            "Outgoing and sweet-natured hunting dog", listOf("Outgoing", "Sweet-natured", "Active", "Playful")),
        DogBreed("German Shorthaired Pointer", DogSize.LARGE, "Friendly, Intelligent", "12-14 years", "Germany", DogGroup.SPORTING,
            "Versatile and intelligent hunting dog", listOf("Friendly", "Intelligent", "Eager", "Alert")),
        
        // Hound Dogs
        DogBreed("Beagle", DogSize.MEDIUM, "Friendly, Curious", "13-16 years", "England", DogGroup.HOUND,
            "Friendly and curious scent hound", listOf("Friendly", "Curious", "Merry", "Gentle")),
        DogBreed("Bloodhound", DogSize.LARGE, "Stubborn, Affectionate", "10-12 years", "Belgium", DogGroup.HOUND,
            "Gentle and patient scent hound", listOf("Stubborn", "Affectionate", "Patient", "Gentle")),
        DogBreed("Basset Hound", DogSize.MEDIUM, "Charming, Patient", "12-13 years", "France", DogGroup.HOUND,
            "Charming and patient scent hound", listOf("Charming", "Patient", "Low-key", "Stubborn")),
        DogBreed("Dachshund", DogSize.SMALL, "Spunky, Clever", "12-16 years", "Germany", DogGroup.HOUND,
            "Spunky and clever hunting dog", listOf("Spunky", "Clever", "Courageous", "Devoted")),
        DogBreed("Greyhound", DogSize.LARGE, "Gentle, Independent", "10-13 years", "Egypt", DogGroup.HOUND,
            "Gentle and independent sighthound", listOf("Gentle", "Independent", "Noble", "Athletic")),
        DogBreed("Whippet", DogSize.MEDIUM, "Calm, Affectionate", "12-15 years", "England", DogGroup.HOUND,
            "Calm and affectionate sighthound", listOf("Calm", "Affectionate", "Gentle", "Quiet")),
        DogBreed("Afghan Hound", DogSize.LARGE, "Independent, Dignified", "12-18 years", "Afghanistan", DogGroup.HOUND,
            "Independent and dignified sighthound", listOf("Independent", "Dignified", "Aloof", "Sweet")),
        DogBreed("Saluki", DogSize.LARGE, "Gentle, Dignified", "12-14 years", "Middle East", DogGroup.HOUND,
            "Gentle and dignified sighthound", listOf("Gentle", "Dignified", "Reserved", "Independent")),
        DogBreed("Rhodesian Ridgeback", DogSize.LARGE, "Loyal, Independent", "10-12 years", "South Africa", DogGroup.HOUND,
            "Loyal and independent hunting dog", listOf("Loyal", "Independent", "Dignified", "Sensitive")),
        
        // Terrier Dogs
        DogBreed("Jack Russell Terrier", DogSize.SMALL, "Stubborn, Fearless", "13-16 years", "England", DogGroup.TERRIER,
            "Stubborn and fearless hunting terrier", listOf("Stubborn", "Fearless", "Energetic", "Intelligent")),
        DogBreed("Bull Terrier", DogSize.MEDIUM, "Playful, Charming", "12-13 years", "England", DogGroup.TERRIER,
            "Playful and charming companion", listOf("Playful", "Charming", "Mischievous", "Friendly")),
        DogBreed("Staffordshire Bull Terrier", DogSize.MEDIUM, "Fearless, Affectionate", "12-14 years", "England", DogGroup.TERRIER,
            "Fearless and affectionate companion", listOf("Fearless", "Affectionate", "Loyal", "Intelligent")),
        DogBreed("Scottish Terrier", DogSize.SMALL, "Independent, Confident", "12-15 years", "Scotland", DogGroup.TERRIER,
            "Independent and confident terrier", listOf("Independent", "Confident", "Alert", "Quick")),
        DogBreed("West Highland White Terrier", DogSize.SMALL, "Hardy, Self-confident", "13-15 years", "Scotland", DogGroup.TERRIER,
            "Hardy and self-confident terrier", listOf("Hardy", "Self-confident", "Alert", "Happy")),
        DogBreed("Border Terrier", DogSize.SMALL, "Obedient, Good-natured", "12-15 years", "England", DogGroup.TERRIER,
            "Obedient and good-natured terrier", listOf("Obedient", "Good-natured", "Alert", "Temperate")),
        DogBreed("Airedale Terrier", DogSize.LARGE, "Friendly, Courageous", "11-14 years", "England", DogGroup.TERRIER,
            "Friendly and courageous terrier", listOf("Friendly", "Courageous", "Intelligent", "Confident")),
        DogBreed("Cairn Terrier", DogSize.SMALL, "Alert, Cheerful", "13-15 years", "Scotland", DogGroup.TERRIER,
            "Alert and cheerful terrier", listOf("Alert", "Cheerful", "Intelligent", "Hardy")),
        
        // Toy Dogs
        DogBreed("Chihuahua", DogSize.TOY, "Graceful, Alert", "14-16 years", "Mexico", DogGroup.TOY,
            "Graceful and alert companion", listOf("Graceful", "Alert", "Quick", "Devoted")),
        DogBreed("Pomeranian", DogSize.TOY, "Inquisitive, Bold", "12-16 years", "Germany", DogGroup.TOY,
            "Inquisitive and bold companion", listOf("Inquisitive", "Bold", "Lively", "Intelligent")),
        DogBreed("Yorkshire Terrier", DogSize.TOY, "Bold, Confident", "11-15 years", "England", DogGroup.TOY,
            "Bold and confident companion", listOf("Bold", "Confident", "Intelligent", "Independent")),
        DogBreed("Maltese", DogSize.TOY, "Gentle, Playful", "12-15 years", "Malta", DogGroup.TOY,
            "Gentle and playful companion", listOf("Gentle", "Playful", "Charming", "Vigilant")),
        DogBreed("Shih Tzu", DogSize.TOY, "Affectionate, Playful", "10-18 years", "China", DogGroup.TOY,
            "Affectionate and playful companion", listOf("Affectionate", "Playful", "Outgoing", "Trusting")),
        DogBreed("Pug", DogSize.TOY, "Charming, Mischievous", "13-15 years", "China", DogGroup.TOY,
            "Charming and mischievous companion", listOf("Charming", "Mischievous", "Loving", "Stubborn")),
        DogBreed("Boston Terrier", DogSize.TOY, "Friendly, Bright", "11-13 years", "USA", DogGroup.TOY,
            "Friendly and bright companion", listOf("Friendly", "Bright", "Amusing", "Loving")),
        DogBreed("French Bulldog", DogSize.TOY, "Adaptable, Playful", "10-12 years", "France", DogGroup.TOY,
            "Adaptable and playful companion", listOf("Adaptable", "Playful", "Smart", "Patient")),
        DogBreed("Cavalier King Charles Spaniel", DogSize.TOY, "Affectionate, Gentle", "9-14 years", "England", DogGroup.TOY,
            "Affectionate and gentle companion", listOf("Affectionate", "Gentle", "Graceful", "Patient")),
        DogBreed("Papillon", DogSize.TOY, "Happy, Alert", "13-16 years", "France", DogGroup.TOY,
            "Happy and alert companion", listOf("Happy", "Alert", "Friendly", "Patient")),
        
        // Non-Sporting Dogs
        DogBreed("Poodle", DogSize.MEDIUM, "Active, Alert", "12-15 years", "Germany", DogGroup.NON_SPORTING,
            "Active and alert companion", listOf("Active", "Alert", "Intelligent", "Faithful")),
        DogBreed("Bulldog", DogSize.MEDIUM, "Calm, Friendly", "8-10 years", "England", DogGroup.NON_SPORTING,
            "Calm and friendly companion", listOf("Calm", "Friendly", "Courageous", "Gregarious")),
        DogBreed("Dalmatian", DogSize.LARGE, "Energetic, Playful", "11-13 years", "Croatia", DogGroup.NON_SPORTING,
            "Energetic and playful companion", listOf("Energetic", "Playful", "Sensitive", "Outgoing")),
        DogBreed("Schnauzer", DogSize.MEDIUM, "Obedient, Alert", "12-15 years", "Germany", DogGroup.NON_SPORTING,
            "Obedient and alert companion", listOf("Obedient", "Alert", "Loyal", "Intelligent")),
        DogBreed("Bichon Frise", DogSize.SMALL, "Cheerful, Curious", "12-15 years", "France", DogGroup.NON_SPORTING,
            "Cheerful and curious companion", listOf("Cheerful", "Curious", "Peppy", "Playful")),
        DogBreed("Lhasa Apso", DogSize.SMALL, "Confident, Smart", "12-15 years", "Tibet", DogGroup.NON_SPORTING,
            "Confident and smart companion", listOf("Confident", "Smart", "Independent", "Alert")),
        DogBreed("Tibetan Spaniel", DogSize.SMALL, "Self-confident, Reserved", "12-15 years", "Tibet", DogGroup.NON_SPORTING,
            "Self-confident and reserved companion", listOf("Self-confident", "Reserved", "Alert", "Happy")),
        DogBreed("Chinese Crested", DogSize.SMALL, "Alert, Lively", "13-18 years", "China", DogGroup.NON_SPORTING,
            "Alert and lively companion", listOf("Alert", "Lively", "Playful", "Affectionate")),
        
        // Herding Dogs
        DogBreed("Border Collie", DogSize.MEDIUM, "Tenacious, Keen", "12-15 years", "Scotland", DogGroup.HERDING,
            "Tenacious and keen working dog", listOf("Tenacious", "Keen", "Energetic", "Intelligent")),
        DogBreed("Australian Shepherd", DogSize.MEDIUM, "Smart, Work-focused", "12-13 years", "USA", DogGroup.HERDING,
            "Smart and work-focused herding dog", listOf("Smart", "Work-focused", "Exuberant", "Good-natured")),
        DogBreed("Collie", DogSize.LARGE, "Graceful, Devoted", "12-14 years", "Scotland", DogGroup.HERDING,
            "Graceful and devoted herding dog", listOf("Graceful", "Devoted", "Proud", "Smart")),
        DogBreed("Shetland Sheepdog", DogSize.SMALL, "Playful, Energetic", "12-13 years", "Scotland", DogGroup.HERDING,
            "Playful and energetic herding dog", listOf("Playful", "Energetic", "Bright", "Intelligent")),
        DogBreed("Welsh Corgi", DogSize.SMALL, "Alert, Affectionate", "12-15 years", "Wales", DogGroup.HERDING,
            "Alert and affectionate herding dog", listOf("Alert", "Affectionate", "Intelligent", "Bold")),
        DogBreed("Old English Sheepdog", DogSize.LARGE, "Adaptable, Intelligent", "10-12 years", "England", DogGroup.HERDING,
            "Adaptable and intelligent herding dog", listOf("Adaptable", "Intelligent", "Gentle", "Protective")),
        DogBreed("Belgian Malinois", DogSize.LARGE, "Confident, Hard-working", "14-16 years", "Belgium", DogGroup.HERDING,
            "Confident and hard-working herding dog", listOf("Confident", "Hard-working", "Alert", "Intelligent"))
    )
    
    /**
     * Get breeds by group
     */
    fun getBreedsByGroup(group: DogGroup): List<DogBreed> {
        return allBreeds.filter { it.group == group }
    }
    
    /**
     * Get breeds by size
     */
    fun getBreedsBySize(size: DogSize): List<DogBreed> {
        return allBreeds.filter { it.size == size }
    }
    
    /**
     * Search breeds by name
     */
    fun searchBreeds(query: String): List<DogBreed> {
        return allBreeds.filter { 
            it.name.contains(query, ignoreCase = true) ||
            it.temperament.contains(query, ignoreCase = true) ||
            it.origin.contains(query, ignoreCase = true)
        }
    }
    
    /**
     * Get all breed names
     */
    fun getAllBreedNames(): List<String> {
        return allBreeds.map { it.name }
    }
    
    /**
     * Get breeds by temperament keywords
     */
    fun getBreedsByTemperament(keywords: List<String>): List<DogBreed> {
        return allBreeds.filter { breed ->
            keywords.any { keyword ->
                breed.temperament.contains(keyword, ignoreCase = true)
            }
        }
    }
}
