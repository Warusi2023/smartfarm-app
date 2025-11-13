/**
 * Farm-to-Table Recommendation & Sync Service
 * 
 * This service provides:
 * 1. Dynamic product suggestions based on active crops and livestock
 * 2. Relationship management between crops/livestock and value-added products
 * 3. Automatic cleanup of orphaned products when source entities are deleted
 */

class FarmToTableRecommendationService {
    constructor() {
        this.products = []; // FarmToTableProduct records
        this.crops = [];
        this.livestock = [];
        this.byproductsDatabase = null; // Will be set in init
        this.storageKey = 'farmToTableProducts';
        this.storageKeySources = 'farmToTableSources'; // Join table for relationships
        
        // Don't call init here - wait for explicit init() call
    }
    
    async init() {
        console.log('🚀 Initializing Farm-to-Table Recommendation Service...');
        
        // Wait for byproducts database to be available
        let attempts = 0;
        while (!window.ByproductsDatabase && attempts < 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        this.byproductsDatabase = window.ByproductsDatabase || {};
        if (!this.byproductsDatabase || (!this.byproductsDatabase.crops && !this.byproductsDatabase.livestock)) {
            console.warn('⚠️ ByproductsDatabase not fully loaded, recommendations may be limited');
        } else {
            console.log('✅ ByproductsDatabase loaded');
        }
        
        await this.loadProducts();
        await this.loadCrops();
        await this.loadLivestock();
        await this.cleanupOrphanedProducts();
        
        console.log(`✅ Service initialized:`);
        console.log(`   - ${this.crops.length} crops loaded`);
        if (this.crops.length > 0) {
            console.log(`     Sample crops: ${this.crops.slice(0, 3).map(c => `"${c.name}"`).join(', ')}`);
        }
        console.log(`   - ${this.livestock.length} livestock loaded`);
        if (this.livestock.length > 0) {
            console.log(`     Sample livestock: ${this.livestock.slice(0, 3).map(a => `"${a.name || a.type || 'Unnamed'}"`).join(', ')}`);
        }
        console.log(`   - ${this.products.length} existing products`);
        console.log(`   - Byproducts DB: ${Object.keys(this.byproductsDatabase?.crops || {}).length} crops, ${Object.keys(this.byproductsDatabase?.livestock || {}).length} livestock types`);
    }
    
    /**
     * Data Model: FarmToTableProduct
     * {
     *   id: number,
     *   name: string,
     *   category: string,
     *   description: string,
     *   sourceType: 'crop' | 'livestock' | 'mixed',
     *   sourceIds: number[], // IDs of crops/livestock this product depends on
     *   marketValue: number,
     *   processingMethod: string,
     *   equipment: string[],
     *   shelfLife: string,
     *   targetMarket: string,
     *   processingSteps: string[],
     *   projectedOutput: object,
     *   status: 'suggested' | 'planned' | 'in-progress' | 'completed' | 'cancelled',
     *   createdAt: string,
     *   updatedAt: string,
     *   isActive: boolean
     * }
     */
    
    /**
     * Load active crops from the system
     */
    async loadCrops() {
        try {
            // Try API first
            if (window.SmartFarmAPI && typeof window.SmartFarmAPI.isBackendAvailable === 'function') {
                const isAvailable = await window.SmartFarmAPI.isBackendAvailable();
                if (isAvailable) {
                    const response = await window.SmartFarmAPI.getCrops();
                    if (response && response.success && response.data) {
                        this.crops = Array.isArray(response.data) ? response.data : [];
                        return;
                    }
                }
            }
            
            // Fallback to localStorage - try multiple possible keys
            let savedCrops = localStorage.getItem('smartfarm_crops') || localStorage.getItem('crops');
            if (savedCrops) {
                const parsed = JSON.parse(savedCrops);
                this.crops = Array.isArray(parsed) ? parsed : [];
            } else {
                this.crops = [];
            }
            
            console.log(`📦 Loaded ${this.crops.length} crops for recommendations`);
        } catch (error) {
            console.error('Error loading crops:', error);
            this.crops = [];
        }
    }
    
    /**
     * Load active livestock from the system
     */
    async loadLivestock() {
        try {
            // Try API first
            if (window.SmartFarmAPI && typeof window.SmartFarmAPI.isBackendAvailable === 'function') {
                const isAvailable = await window.SmartFarmAPI.isBackendAvailable();
                if (isAvailable) {
                    const response = await window.SmartFarmAPI.getLivestock();
                    if (response && response.success && response.data) {
                        this.livestock = Array.isArray(response.data) ? response.data : [];
                        return;
                    }
                }
            }
            
            // Fallback to localStorage
            const savedLivestock = localStorage.getItem('livestock');
            if (savedLivestock) {
                const parsed = JSON.parse(savedLivestock);
                this.livestock = Array.isArray(parsed) ? parsed : [];
            } else {
                this.livestock = [];
            }
            
            console.log(`🐄 Loaded ${this.livestock.length} livestock for recommendations`);
        } catch (error) {
            console.error('Error loading livestock:', error);
            this.livestock = [];
        }
    }
    
    /**
     * Load Farm-to-Table products from storage
     */
    async loadProducts() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.products = JSON.parse(saved);
            } else {
                this.products = [];
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
        }
    }
    
    /**
     * Save products to storage
     */
    saveProducts() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.products));
        } catch (error) {
            console.error('Error saving products:', error);
        }
    }
    
    /**
     * Generate dynamic product suggestions based on active crops and livestock
     */
    generateRecommendations() {
        console.log('🔍 Generating recommendations...');
        console.log(`   - Crops: ${this.crops.length}, Livestock: ${this.livestock.length}`);
        const recommendations = [];
        
        // Generate recommendations from crops
        this.crops.forEach(crop => {
            const cropName = crop.name || '';
            console.log(`   📦 Processing crop: "${cropName}" (ID: ${crop.id})`);
            const cropByproducts = this.getByproductsForCrop(cropName);
            
            cropByproducts.forEach(byproduct => {
                recommendations.push({
                    id: this.generateProductId(),
                    name: byproduct.name,
                    category: byproduct.category || 'Food Processing',
                    description: byproduct.description || '',
                    sourceType: 'crop',
                    sourceIds: [crop.id],
                    sourceNames: [crop.name],
                    marketValue: byproduct.marketValue || 0,
                    processingMethod: byproduct.processingMethod || '',
                    equipment: byproduct.equipment || [],
                    shelfLife: byproduct.shelfLife || '',
                    targetMarket: byproduct.targetMarket || '',
                    processingSteps: byproduct.processingSteps || [],
                    projectedOutput: byproduct.projectedOutput || {},
                    status: 'suggested',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: true,
                    isAutoGenerated: true // Mark as auto-generated
                });
            });
        });
        
        // Generate recommendations from livestock
        this.livestock.forEach(animal => {
            const animalType = animal.type || animal.species || '';
            const animalName = animal.name || animalType;
            console.log(`   🐄 Processing livestock: "${animalName}" (Type: ${animalType}, ID: ${animal.id})`);
            const animalByproducts = this.getByproductsForLivestock(animalType);
            
            animalByproducts.forEach(byproduct => {
                recommendations.push({
                    id: this.generateProductId(),
                    name: byproduct.name,
                    category: byproduct.category || 'Food Processing',
                    description: byproduct.description || '',
                    sourceType: 'livestock',
                    sourceIds: [animal.id],
                    sourceNames: [animal.name || `${animalType} ${animal.id}`],
                    marketValue: byproduct.marketValue || 0,
                    processingMethod: byproduct.processingMethod || '',
                    equipment: byproduct.equipment || [],
                    shelfLife: byproduct.shelfLife || '',
                    targetMarket: byproduct.targetMarket || '',
                    processingSteps: byproduct.processingSteps || [],
                    projectedOutput: byproduct.projectedOutput || {},
                    status: 'suggested',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: true,
                    isAutoGenerated: true
                });
            });
        });
        
        // Remove duplicates (same product name from same source)
        const uniqueRecommendations = [];
        const seen = new Set();
        
        recommendations.forEach(rec => {
            const key = `${rec.name}_${rec.sourceType}_${rec.sourceIds.join(',')}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueRecommendations.push(rec);
            }
        });
        
        console.log(`✅ Generated ${uniqueRecommendations.length} unique recommendations`);
        return uniqueRecommendations;
    }
    
    /**
     * Normalize a name for matching (lowercase, replace spaces with underscores)
     */
    normalizeName(name) {
        if (!name) return '';
        return name.toLowerCase().trim().replace(/\s+/g, '_');
    }
    
    /**
     * Get byproducts for a specific crop
     */
    getByproductsForCrop(cropName) {
        if (!this.byproductsDatabase || !this.byproductsDatabase.crops) {
            console.warn('⚠️ ByproductsDatabase.crops not available');
            return [];
        }
        
        if (!cropName) {
            console.warn('⚠️ No crop name provided');
            return [];
        }
        
        // Normalize the crop name
        const normalizedCropName = this.normalizeName(cropName);
        const originalCropName = cropName.toLowerCase().trim();
        
        console.log(`   🔍 Looking for byproducts for crop: "${cropName}" (normalized: "${normalizedCropName}")`);
        
        // Strategy 1: Try exact match with normalized name
        let cropData = this.byproductsDatabase.crops[normalizedCropName];
        
        // Strategy 2: Try exact match with original lowercase name
        if (!cropData) {
            cropData = this.byproductsDatabase.crops[originalCropName];
        }
        
        // Strategy 3: Try partial match (normalized)
        if (!cropData) {
            for (const key in this.byproductsDatabase.crops) {
                const normalizedKey = this.normalizeName(key);
                if (normalizedCropName === normalizedKey || 
                    normalizedCropName.includes(normalizedKey) || 
                    normalizedKey.includes(normalizedCropName)) {
                    cropData = this.byproductsDatabase.crops[key];
                    console.log(`   ✅ Matched "${cropName}" to database key "${key}"`);
                    break;
                }
            }
        }
        
        // Strategy 4: Try partial match (original)
        if (!cropData) {
            for (const key in this.byproductsDatabase.crops) {
                if (originalCropName.includes(key) || key.includes(originalCropName)) {
                    cropData = this.byproductsDatabase.crops[key];
                    console.log(`   ✅ Matched "${cropName}" to database key "${key}" (partial match)`);
                    break;
                }
            }
        }
        
        const byproducts = cropData ? (cropData.byproducts || []) : [];
        if (byproducts.length === 0) {
            console.log(`   ⚠️ No byproducts found for crop: "${cropName}"`);
            // Log available keys for debugging
            const availableKeys = Object.keys(this.byproductsDatabase.crops).slice(0, 10);
            console.log(`   📋 Available crop keys (first 10): ${availableKeys.join(', ')}`);
        } else {
            console.log(`   ✅ Found ${byproducts.length} byproducts for "${cropName}"`);
        }
        return byproducts;
    }
    
    /**
     * Get byproducts for a specific livestock type
     */
    getByproductsForLivestock(animalType) {
        if (!this.byproductsDatabase || !this.byproductsDatabase.livestock) {
            console.warn('⚠️ ByproductsDatabase.livestock not available');
            return [];
        }
        
        if (!animalType) {
            console.warn('⚠️ No livestock type provided');
            return [];
        }
        
        // Normalize the animal type
        const normalizedAnimalType = this.normalizeName(animalType);
        const originalAnimalType = animalType.toLowerCase().trim();
        
        console.log(`   🔍 Looking for byproducts for livestock: "${animalType}" (normalized: "${normalizedAnimalType}")`);
        
        // Strategy 1: Try exact match with normalized name
        let animalData = this.byproductsDatabase.livestock[normalizedAnimalType];
        
        // Strategy 2: Try exact match with original lowercase name
        if (!animalData) {
            animalData = this.byproductsDatabase.livestock[originalAnimalType];
        }
        
        // Strategy 3: Try partial match (normalized)
        if (!animalData) {
            for (const key in this.byproductsDatabase.livestock) {
                const normalizedKey = this.normalizeName(key);
                if (normalizedAnimalType === normalizedKey || 
                    normalizedAnimalType.includes(normalizedKey) || 
                    normalizedKey.includes(normalizedAnimalType)) {
                    animalData = this.byproductsDatabase.livestock[key];
                    console.log(`   ✅ Matched "${animalType}" to database key "${key}"`);
                    break;
                }
            }
        }
        
        // Strategy 4: Try partial match (original)
        if (!animalData) {
            for (const key in this.byproductsDatabase.livestock) {
                if (originalAnimalType.includes(key) || key.includes(originalAnimalType)) {
                    animalData = this.byproductsDatabase.livestock[key];
                    console.log(`   ✅ Matched "${animalType}" to database key "${key}" (partial match)`);
                    break;
                }
            }
        }
        
        const byproducts = animalData ? (animalData.byproducts || []) : [];
        if (byproducts.length === 0) {
            console.log(`   ⚠️ No byproducts found for livestock: "${animalType}"`);
            // Log available keys for debugging
            const availableKeys = Object.keys(this.byproductsDatabase.livestock).slice(0, 10);
            console.log(`   📋 Available livestock keys (first 10): ${availableKeys.join(', ')}`);
        } else {
            console.log(`   ✅ Found ${byproducts.length} byproducts for "${animalType}"`);
        }
        return byproducts;
    }
    
    /**
     * Sync recommendations with current crops and livestock
     * This should be called whenever crops or livestock are added/removed
     */
    async syncRecommendations() {
        // Reload current data
        await this.loadCrops();
        await this.loadLivestock();
        
        // Get current active source IDs
        const activeCropIds = new Set(this.crops.map(c => c.id));
        const activeLivestockIds = new Set(this.livestock.map(l => l.id));
        
        // Mark products as inactive if their sources are deleted
        this.products.forEach(product => {
            if (product.isAutoGenerated) {
                let hasActiveSource = false;
                
                if (product.sourceType === 'crop') {
                    hasActiveSource = product.sourceIds.some(id => activeCropIds.has(id));
                } else if (product.sourceType === 'livestock') {
                    hasActiveSource = product.sourceIds.some(id => activeLivestockIds.has(id));
                } else if (product.sourceType === 'mixed') {
                    hasActiveSource = product.sourceIds.some(id => 
                        activeCropIds.has(id) || activeLivestockIds.has(id)
                    );
                }
                
                if (!hasActiveSource) {
                    product.isActive = false;
                    product.status = 'cancelled';
                    product.updatedAt = new Date().toISOString();
                }
            }
        });
        
        // Generate new recommendations
        const newRecommendations = this.generateRecommendations();
        
        // Add new recommendations that don't already exist
        newRecommendations.forEach(newRec => {
            const exists = this.products.some(p => 
                p.name === newRec.name && 
                p.sourceType === newRec.sourceType &&
                JSON.stringify(p.sourceIds.sort()) === JSON.stringify(newRec.sourceIds.sort()) &&
                p.isAutoGenerated
            );
            
            if (!exists) {
                this.products.push(newRec);
            }
        });
        
        // Save updated products
        this.saveProducts();
        
        return this.getActiveProducts();
    }
    
    /**
     * Get all active products (only those linked to active crops/livestock)
     */
    getActiveProducts() {
        const activeCropIds = new Set(this.crops.map(c => c.id));
        const activeLivestockIds = new Set(this.livestock.map(l => l.id));
        
        return this.products.filter(product => {
            if (!product.isActive) return false;
            
            // For auto-generated products, check if sources are still active
            if (product.isAutoGenerated) {
                if (product.sourceType === 'crop') {
                    return product.sourceIds.some(id => activeCropIds.has(id));
                } else if (product.sourceType === 'livestock') {
                    return product.sourceIds.some(id => activeLivestockIds.has(id));
                } else if (product.sourceType === 'mixed') {
                    return product.sourceIds.some(id => 
                        activeCropIds.has(id) || activeLivestockIds.has(id)
                    );
                }
            }
            
            // For manually created products, return if active
            return true;
        });
    }
    
    /**
     * Clean up orphaned products (hard delete)
     * This removes products that reference non-existent crops/livestock
     */
    async cleanupOrphanedProducts() {
        const activeCropIds = new Set(this.crops.map(c => c.id));
        const activeLivestockIds = new Set(this.livestock.map(l => l.id));
        
        const beforeCount = this.products.length;
        
        // Remove products that have no active sources
        this.products = this.products.filter(product => {
            // Keep manually created products that are active
            if (!product.isAutoGenerated && product.isActive) {
                return true;
            }
            
            // For auto-generated products, check if at least one source exists
            if (product.isAutoGenerated) {
                if (product.sourceType === 'crop') {
                    return product.sourceIds.some(id => activeCropIds.has(id));
                } else if (product.sourceType === 'livestock') {
                    return product.sourceIds.some(id => activeLivestockIds.has(id));
                } else if (product.sourceType === 'mixed') {
                    return product.sourceIds.some(id => 
                        activeCropIds.has(id) || activeLivestockIds.has(id)
                    );
                }
            }
            
            return false;
        });
        
        const afterCount = this.products.length;
        const removedCount = beforeCount - afterCount;
        
        if (removedCount > 0) {
            console.log(`🧹 Cleaned up ${removedCount} orphaned Farm-to-Table products`);
            this.saveProducts();
        }
        
        return removedCount;
    }
    
    /**
     * Handle crop deletion - remove dependent products
     */
    async onCropDeleted(cropId) {
        const beforeCount = this.products.length;
        
        // Remove products that depend exclusively on this crop
        this.products = this.products.filter(product => {
            if (product.sourceType === 'crop' && product.sourceIds.includes(cropId)) {
                // If this is the only source, remove it
                if (product.sourceIds.length === 1) {
                    return false; // Delete
                } else {
                    // Remove this crop from sourceIds
                    product.sourceIds = product.sourceIds.filter(id => id !== cropId);
                    product.sourceNames = product.sourceNames.filter((name, idx) => 
                        product.sourceIds[idx] !== undefined
                    );
                    product.updatedAt = new Date().toISOString();
                    return true; // Keep but update
                }
            }
            return true; // Keep
        });
        
        const afterCount = this.products.length;
        const removedCount = beforeCount - afterCount;
        
        if (removedCount > 0) {
            console.log(`🗑️ Removed ${removedCount} Farm-to-Table products after crop deletion`);
            this.saveProducts();
        }
        
        return removedCount;
    }
    
    /**
     * Handle livestock deletion - remove dependent products
     */
    async onLivestockDeleted(livestockId) {
        const beforeCount = this.products.length;
        
        // Remove products that depend exclusively on this livestock
        this.products = this.products.filter(product => {
            if (product.sourceType === 'livestock' && product.sourceIds.includes(livestockId)) {
                // If this is the only source, remove it
                if (product.sourceIds.length === 1) {
                    return false; // Delete
                } else {
                    // Remove this livestock from sourceIds
                    product.sourceIds = product.sourceIds.filter(id => id !== livestockId);
                    product.sourceNames = product.sourceNames.filter((name, idx) => 
                        product.sourceIds[idx] !== undefined
                    );
                    product.updatedAt = new Date().toISOString();
                    return true; // Keep but update
                }
            }
            return true; // Keep
        });
        
        const afterCount = this.products.length;
        const removedCount = beforeCount - afterCount;
        
        if (removedCount > 0) {
            console.log(`🗑️ Removed ${removedCount} Farm-to-Table products after livestock deletion`);
            this.saveProducts();
        }
        
        return removedCount;
    }
    
    /**
     * Create a manual product (not auto-generated)
     */
    createManualProduct(productData) {
        const product = {
            id: this.generateProductId(),
            name: productData.name,
            category: productData.category || 'Food Processing',
            description: productData.description || '',
            sourceType: productData.sourceType || 'mixed',
            sourceIds: productData.sourceIds || [],
            sourceNames: productData.sourceNames || [],
            marketValue: productData.marketValue || 0,
            processingMethod: productData.processingMethod || '',
            equipment: productData.equipment || [],
            shelfLife: productData.shelfLife || '',
            targetMarket: productData.targetMarket || '',
            processingSteps: productData.processingSteps || [],
            projectedOutput: productData.projectedOutput || {},
            status: productData.status || 'planned',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            isAutoGenerated: false
        };
        
        this.products.push(product);
        this.saveProducts();
        
        return product;
    }
    
    /**
     * Update a product
     */
    updateProduct(productId, updates) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) return null;
        
        this.products[index] = {
            ...this.products[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        this.saveProducts();
        return this.products[index];
    }
    
    /**
     * Delete a product
     */
    deleteProduct(productId) {
        const beforeCount = this.products.length;
        this.products = this.products.filter(p => p.id !== productId);
        const removed = beforeCount > this.products.length;
        
        if (removed) {
            this.saveProducts();
        }
        
        return removed;
    }
    
    /**
     * Generate unique product ID
     */
    generateProductId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Get products by source
     */
    getProductsBySource(sourceType, sourceId) {
        return this.getActiveProducts().filter(p => 
            p.sourceType === sourceType && p.sourceIds.includes(sourceId)
        );
    }
    
    /**
     * Get statistics
     */
    getStatistics() {
        const active = this.getActiveProducts();
        const suggested = active.filter(p => p.status === 'suggested').length;
        const planned = active.filter(p => p.status === 'planned').length;
        const inProgress = active.filter(p => p.status === 'in-progress').length;
        const completed = active.filter(p => p.status === 'completed').length;
        
        const totalValue = active.reduce((sum, p) => sum + (p.marketValue || 0), 0);
        
        return {
            total: active.length,
            suggested,
            planned,
            inProgress,
            completed,
            totalValue,
            bySource: {
                crop: active.filter(p => p.sourceType === 'crop').length,
                livestock: active.filter(p => p.sourceType === 'livestock').length,
                mixed: active.filter(p => p.sourceType === 'mixed').length
            }
        };
    }
    
    /**
     * Debug method - call this from console to diagnose issues
     * Usage: const service = new FarmToTableRecommendationService(); await service.init(); service.debug();
     */
    debug() {
        console.log('🔍 === Farm-to-Table Recommendation Service Debug ===');
        console.log('📦 Crops:', this.crops.length);
        this.crops.forEach(crop => {
            console.log(`   - "${crop.name}" (ID: ${crop.id})`);
        });
        console.log('🐄 Livestock:', this.livestock.length);
        this.livestock.forEach(animal => {
            console.log(`   - "${animal.name || 'Unnamed'}" (Type: ${animal.type || animal.species}, ID: ${animal.id})`);
        });
        console.log('💾 Products:', this.products.length);
        console.log('📚 Byproducts Database:', {
            cropsAvailable: this.byproductsDatabase?.crops ? Object.keys(this.byproductsDatabase.crops).length : 0,
            livestockAvailable: this.byproductsDatabase?.livestock ? Object.keys(this.byproductsDatabase.livestock).length : 0,
            sampleCropKeys: this.byproductsDatabase?.crops ? Object.keys(this.byproductsDatabase.crops).slice(0, 10) : [],
            sampleLivestockKeys: this.byproductsDatabase?.livestock ? Object.keys(this.byproductsDatabase.livestock).slice(0, 10) : []
        });
        
        // Test matching for each crop
        console.log('🧪 Testing crop matching:');
        this.crops.forEach(crop => {
            const byproducts = this.getByproductsForCrop(crop.name);
            console.log(`   "${crop.name}": ${byproducts.length} byproducts found`);
        });
        
        // Test matching for each livestock
        console.log('🧪 Testing livestock matching:');
        this.livestock.forEach(animal => {
            const animalType = animal.type || animal.species || '';
            const byproducts = this.getByproductsForLivestock(animalType);
            console.log(`   "${animal.name || animalType}" (${animalType}): ${byproducts.length} byproducts found`);
        });
        
        console.log('🔍 === End Debug ===');
    }
}

// Export for use in other modules
window.FarmToTableRecommendationService = FarmToTableRecommendationService;

