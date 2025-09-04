/**
 * SmartFarm Image Management System
 * Handles upload, storage, categorization, and management of farm-related images
 */

class SmartFarmImageManager {
    constructor() {
        this.images = [];
        this.categories = {
            pests: { name: 'Pests & Diseases', icon: 'fas fa-bug', color: '#c62828' },
            animals: { name: 'Livestock', icon: 'fas fa-cow', color: '#2e7d32' },
            crops: { name: 'Crops & Plants', icon: 'fas fa-seedling', color: '#ef6c00' },
            equipment: { name: 'Equipment', icon: 'fas fa-tractor', color: '#1565c0' },
            soil: { name: 'Soil & Land', icon: 'fas fa-mountain', color: '#795548' },
            weather: { name: 'Weather & Environment', icon: 'fas fa-cloud-sun', color: '#0277bd' }
        };
        
        this.supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        this.maxFileSize = 10 * 1024 * 1024; // 10MB
        this.imageQuality = 0.8;
        
        this.init();
    }
    
    init() {
        this.loadImages();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Global image upload button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="upload-image"]')) {
                this.showUploadModal();
            }
            
            if (e.target.matches('[data-action="view-images"]')) {
                this.showImageGallery();
            }
        });
    }
    
    // Image Upload Methods
    async uploadImage(file, metadata = {}) {
        try {
            // Validate file
            if (!this.validateFile(file)) {
                throw new Error('Invalid file format or size');
            }
            
            // Process and optimize image
            const processedImage = await this.processImage(file);
            
            // Create image record
            const imageRecord = {
                id: this.generateId(),
                name: file.name,
                originalName: file.name,
                size: file.size,
                type: file.type,
                category: metadata.category || this.autoCategorize(file.name),
                tags: metadata.tags || this.generateTags(file.name),
                description: metadata.description || '',
                location: metadata.location || '',
                date: metadata.date || new Date().toISOString(),
                uploadDate: new Date().toISOString(),
                dataURL: processedImage.dataURL,
                thumbnail: processedImage.thumbnail,
                metadata: {
                    width: processedImage.width,
                    height: processedImage.height,
                    aspectRatio: processedImage.width / processedImage.height,
                    fileSize: processedImage.size
                }
            };
            
            // Save image
            this.images.push(imageRecord);
            this.saveImages();
            
            // Trigger events
            this.triggerEvent('imageUploaded', imageRecord);
            
            return imageRecord;
            
        } catch (error) {
            console.error('Image upload failed:', error);
            throw error;
        }
    }
    
    validateFile(file) {
        // Check file type
        if (!this.supportedFormats.includes(file.type)) {
            throw new Error(`Unsupported file type: ${file.type}. Supported: ${this.supportedFormats.join(', ')}`);
        }
        
        // Check file size
        if (file.size > this.maxFileSize) {
            throw new Error(`File too large: ${this.formatFileSize(file.size)}. Maximum: ${this.formatFileSize(this.maxFileSize)}`);
        }
        
        return true;
    }
    
    async processImage(file) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Calculate dimensions
                const maxWidth = 1920;
                const maxHeight = 1080;
                let { width, height } = img;
                
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }
                
                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;
                
                // Draw and compress image
                ctx.drawImage(img, 0, 0, width, height);
                const dataURL = canvas.toDataURL('image/jpeg', this.imageQuality);
                
                // Create thumbnail
                const thumbCanvas = document.createElement('canvas');
                const thumbCtx = thumbCanvas.getContext('2d');
                const thumbSize = 200;
                
                thumbCanvas.width = thumbSize;
                thumbCanvas.height = thumbSize;
                
                // Center crop thumbnail
                const thumbRatio = Math.max(thumbSize / width, thumbSize / height);
                const thumbWidth = width * thumbRatio;
                const thumbHeight = height * thumbRatio;
                const thumbX = (thumbSize - thumbWidth) / 2;
                const thumbY = (thumbSize - thumbHeight) / 2;
                
                thumbCtx.drawImage(img, thumbX, thumbY, thumbWidth, thumbHeight);
                const thumbnail = thumbCanvas.toDataURL('image/jpeg', 0.7);
                
                resolve({
                    dataURL,
                    thumbnail,
                    width: Math.round(width),
                    height: Math.round(height),
                    size: this.estimateFileSize(dataURL)
                });
            };
            
            img.src = URL.createObjectURL(file);
        });
    }
    
    autoCategorize(fileName) {
        const name = fileName.toLowerCase();
        
        if (name.includes('pest') || name.includes('bug') || name.includes('insect') || name.includes('disease')) {
            return 'pests';
        } else if (name.includes('cow') || name.includes('sheep') || name.includes('chicken') || name.includes('pig')) {
            return 'animals';
        } else if (name.includes('corn') || name.includes('wheat') || name.includes('soy') || name.includes('crop')) {
            return 'crops';
        } else if (name.includes('tractor') || name.includes('equipment') || name.includes('tool')) {
            return 'equipment';
        } else if (name.includes('soil') || name.includes('land') || name.includes('field')) {
            return 'soil';
        } else if (name.includes('weather') || name.includes('rain') || name.includes('sun')) {
            return 'weather';
        }
        
        return 'other';
    }
    
    generateTags(fileName) {
        const tags = [];
        const words = fileName.replace(/[^a-zA-Z]/g, ' ').split(' ').filter(w => w.length > 2);
        
        // Add meaningful words
        tags.push(...words.slice(0, 5));
        
        // Add category-specific tags
        const category = this.autoCategorize(fileName);
        if (category === 'pests') tags.push('pest-control', 'disease-management');
        if (category === 'animals') tags.push('livestock', 'animal-health');
        if (category === 'crops') tags.push('agriculture', 'plant-growth');
        if (category === 'equipment') tags.push('maintenance', 'farm-tools');
        
        return [...new Set(tags)]; // Remove duplicates
    }
    
    // Image Management Methods
    getImages(category = null, tags = []) {
        let filteredImages = this.images;
        
        if (category) {
            filteredImages = filteredImages.filter(img => img.category === category);
        }
        
        if (tags.length > 0) {
            filteredImages = filteredImages.filter(img => 
                tags.some(tag => img.tags.includes(tag))
            );
        }
        
        return filteredImages.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    }
    
    getImageById(id) {
        return this.images.find(img => img.id === id);
    }
    
    updateImage(id, updates) {
        const imageIndex = this.images.findIndex(img => img.id === id);
        if (imageIndex !== -1) {
            this.images[imageIndex] = { ...this.images[imageIndex], ...updates };
            this.saveImages();
            this.triggerEvent('imageUpdated', this.images[imageIndex]);
            return this.images[imageIndex];
        }
        return null;
    }
    
    deleteImage(id) {
        const imageIndex = this.images.findIndex(img => img.id === id);
        if (imageIndex !== -1) {
            const deletedImage = this.images.splice(imageIndex, 1)[0];
            this.saveImages();
            this.triggerEvent('imageDeleted', deletedImage);
            return deletedImage;
        }
        return null;
    }
    
    // Storage Methods
    saveImages() {
        try {
            // Save image metadata (not the actual image data for performance)
            const imageMetadata = this.images.map(img => ({
                ...img,
                dataURL: null, // Don't save large data URLs
                thumbnail: null
            }));
            
            localStorage.setItem('smartfarm-images', JSON.stringify(imageMetadata));
        } catch (error) {
            console.error('Failed to save images:', error);
        }
    }
    
    loadImages() {
        try {
            const savedImages = localStorage.getItem('smartfarm-images');
            if (savedImages) {
                this.images = JSON.parse(savedImages);
            }
        } catch (error) {
            console.error('Failed to load images:', error);
            this.images = [];
        }
    }
    
    // Utility Methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    estimateFileSize(dataURL) {
        // Rough estimation of file size from data URL
        const base64Length = dataURL.length - (dataURL.indexOf(',') + 1);
        return Math.ceil(base64Length * 0.75);
    }
    
    // Event System
    triggerEvent(eventName, data) {
        const event = new CustomEvent(`smartfarm:${eventName}`, { detail: data });
        document.dispatchEvent(event);
    }
    
    // UI Integration Methods
    showUploadModal() {
        // Create and show upload modal
        const modal = this.createUploadModal();
        document.body.appendChild(modal);
        
        // Add event listeners
        const fileInput = modal.querySelector('#imageFileInput');
        const uploadBtn = modal.querySelector('#uploadBtn');
        const closeBtn = modal.querySelector('#closeModal');
        
        fileInput.addEventListener('change', (e) => {
            this.handleFileSelection(e.target.files[0]);
        });
        
        uploadBtn.addEventListener('click', () => {
            this.handleUpload();
        });
        
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    createUploadModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Upload Farm Image</h3>
                    <button class="modal-close" id="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="imageFileInput">Select Image</label>
                        <input type="file" id="imageFileInput" accept="image/*">
                    </div>
                    <div class="form-group">
                        <label for="imageCategory">Category</label>
                        <select id="imageCategory">
                            ${Object.entries(this.categories).map(([key, cat]) => 
                                `<option value="${key}">${cat.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="imageTags">Tags (comma separated)</label>
                        <input type="text" id="imageTags" placeholder="pest, control, field-a3">
                    </div>
                    <div class="form-group">
                        <label for="imageDescription">Description</label>
                        <textarea id="imageDescription" rows="3" placeholder="Describe what you see in the image..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="imageLocation">Location</label>
                        <input type="text" id="imageLocation" placeholder="Field A3, North pasture, etc.">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="closeModal">Cancel</button>
                    <button class="btn btn-primary" id="uploadBtn">Upload Image</button>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    handleFileSelection(file) {
        if (file) {
            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => {
                // Update UI to show selected file
                console.log('File selected:', file.name);
            };
            reader.readAsDataURL(file);
        }
    }
    
    async handleUpload() {
        const fileInput = document.getElementById('imageFileInput');
        const categorySelect = document.getElementById('imageCategory');
        const tagsInput = document.getElementById('imageTags');
        const descriptionInput = document.getElementById('imageDescription');
        const locationInput = document.getElementById('imageLocation');
        
        if (!fileInput.files[0]) {
            alert('Please select an image file');
            return;
        }
        
        try {
            const metadata = {
                category: categorySelect.value,
                tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag),
                description: descriptionInput.value,
                location: locationInput.value
            };
            
            await this.uploadImage(fileInput.files[0], metadata);
            
            // Close modal and show success message
            document.querySelector('.modal').remove();
            this.showNotification('Image uploaded successfully!', 'success');
            
        } catch (error) {
            alert('Upload failed: ' + error.message);
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    // Integration with main app
    integrateWithMainApp() {
        // Add image upload buttons to relevant sections
        this.addImageUploadToSection('crops', 'Add Crop Image');
        this.addImageUploadToSection('livestock', 'Add Animal Photo');
        this.addImageUploadToSection('equipment', 'Add Equipment Photo');
        
        // Add image galleries to sections
        this.addImageGalleryToSection('crops', 'Crop Images');
        this.addImageGalleryToSection('livestock', 'Animal Photos');
        this.addImageGalleryToSection('equipment', 'Equipment Photos');
    }
    
    addImageUploadToSection(sectionId, buttonText) {
        const section = document.getElementById(sectionId);
        if (section) {
            const uploadBtn = document.createElement('button');
            uploadBtn.className = 'btn btn-secondary';
            uploadBtn.innerHTML = `<i class="fas fa-camera"></i> ${buttonText}`;
            uploadBtn.setAttribute('data-action', 'upload-image');
            
            const header = section.querySelector('.section-header');
            if (header) {
                header.appendChild(uploadBtn);
            }
        }
    }
    
    addImageGalleryToSection(sectionId, title) {
        const section = document.getElementById(sectionId);
        if (section) {
            const gallery = document.createElement('div');
            gallery.className = 'image-gallery';
            gallery.innerHTML = `
                <h3>${title}</h3>
                <div class="gallery-grid" id="gallery-${sectionId}"></div>
            `;
            
            section.appendChild(gallery);
            this.populateGallery(sectionId);
        }
    }
    
    populateGallery(sectionId) {
        const galleryGrid = document.getElementById(`gallery-${sectionId}`);
        if (!galleryGrid) return;
        
        const images = this.getImages(sectionId);
        galleryGrid.innerHTML = images.map(img => `
            <div class="gallery-item" data-image-id="${img.id}">
                <img src="${img.thumbnail || img.dataURL}" alt="${img.name}">
                <div class="gallery-item-overlay">
                    <h4>${img.name}</h4>
                    <p>${img.description || ''}</p>
                </div>
            </div>
        `).join('');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.smartFarmImageManager = new SmartFarmImageManager();
    
    // Integrate with main app if available
    if (window.smartFarmApp) {
        window.smartFarmImageManager.integrateWithMainApp();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartFarmImageManager;
}
