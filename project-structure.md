# SmartFarm Project Structure

## Recommended Organization

### 📁 Web Project (`web/`)
- All web-specific files and configurations
- Web build outputs
- Web deployment scripts
- Web-specific documentation

### 📁 Android Project (`android/`)
- All Android-specific files and configurations
- Android build outputs
- Android deployment scripts
- Android-specific documentation

### 📁 Shared Code (`shared/`)
- Common business logic
- Shared data models
- Shared utilities
- Multiplatform code

### 📁 Project Root
- Project-level configuration
- Cross-platform documentation
- General scripts and utilities

## Current Issues
- Web files mixed with Android files in root
- Build outputs scattered across directories
- Deployment scripts not clearly separated

## Benefits of New Structure
- Cleaner build processes
- Easier to maintain separate deployments
- Clear separation of concerns
- Better CI/CD pipeline support
