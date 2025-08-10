# SmartFarm Version Management Guide

## Overview
This guide explains the version management system implemented for the SmartFarm Android app, including semantic versioning, automated version bumping, and changelog management.

## 🎯 Version Management Strategy

### Semantic Versioning (SemVer)
SmartFarm follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) with the format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Incompatible API changes or major feature additions
- **MINOR**: New functionality in a backward-compatible manner
- **PATCH**: Backward-compatible bug fixes

### Version Code
- **Android Version Code**: Integer that must be incremented for each release
- **Auto-incremented**: Automatically managed by the version system
- **Google Play Store**: Uses this for update detection

## 📁 Version Management Files

### Core Files
- `version.properties` - Centralized version configuration
- `version-manager.ps1` - Automated version management script
- `CHANGELOG.md` - Comprehensive changelog tracking
- `app/build.gradle.kts` - Android build configuration

### Version Properties Structure
```properties
# Current version information
version.name=1.0.0
version.code=1

# Version components for semantic versioning
version.major=1
version.minor=0
version.patch=0

# Build information
build.number=1
build.date=2024-01-01

# Version suffixes for different build types
version.suffix.debug=-debug
version.suffix.alpha=-alpha
version.suffix.beta=-beta
version.suffix.rc=-rc
```

## 🚀 Using the Version Manager

### Show Current Version
```powershell
.\version-manager.ps1 -ShowCurrent
```

### Bump Version (Dry Run)
```powershell
# Patch version (bug fixes)
.\version-manager.ps1 -BumpType patch -DryRun

# Minor version (new features)
.\version-manager.ps1 -BumpType minor -DryRun

# Major version (breaking changes)
.\version-manager.ps1 -BumpType major -DryRun
```

### Bump Version (Actual)
```powershell
# Patch version
.\version-manager.ps1 -BumpType patch

# Minor version
.\version-manager.ps1 -BumpType minor

# Major version
.\version-manager.ps1 -BumpType major
```

### Build Type Specific Versions
```powershell
# Debug build
.\version-manager.ps1 -BumpType patch -BuildType debug

# Alpha build
.\version-manager.ps1 -BumpType patch -BuildType alpha

# Beta build
.\version-manager.ps1 -BumpType patch -BuildType beta

# Release candidate
.\version-manager.ps1 -BumpType patch -BuildType rc
```

## 📋 Version Bump Examples

### Patch Version (1.0.0 → 1.0.1)
- Bug fixes
- Minor improvements
- Documentation updates
- Performance optimizations

### Minor Version (1.0.0 → 1.1.0)
- New features
- Enhanced functionality
- New UI components
- Additional integrations

### Major Version (1.0.0 → 2.0.0)
- Breaking API changes
- Major architectural changes
- Complete UI redesign
- Significant feature overhauls

## 🔄 Automated Workflow

### Pre-Release Process
1. **Feature Development**: Work on features in development branch
2. **Version Planning**: Determine appropriate version bump type
3. **Changelog Updates**: Document changes in CHANGELOG.md
4. **Version Bump**: Run version manager script
5. **Testing**: Build and test the new version
6. **Release**: Deploy to Google Play Store

### Post-Release Process
1. **Tag Release**: Create Git tag for the release
2. **Update Documentation**: Update release notes
3. **Monitor**: Track app performance and user feedback
4. **Plan Next Release**: Begin planning for next version

## 📝 Changelog Management

### Changelog Structure
The changelog follows the [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
## [Unreleased]
- Features in development

## [1.1.0] - 2024-01-15
### Added
- New feature descriptions

### Changed
- Changes to existing features

### Fixed
- Bug fixes

### Security
- Security improvements
```

### Changelog Categories
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

## 🏗️ Build Configuration Integration

### Gradle Integration
The version manager automatically updates:
- `versionCode` in build.gradle.kts
- `versionName` with appropriate suffixes for build types

### Build Types
- **Release**: No suffix (e.g., "1.0.0")
- **Debug**: "-debug" suffix (e.g., "1.0.0-debug")
- **Alpha**: "-alpha" suffix (e.g., "1.0.0-alpha")
- **Beta**: "-beta" suffix (e.g., "1.0.0-beta")
- **RC**: "-rc" suffix (e.g., "1.0.0-rc")

## 🔧 Customization

### Version Suffixes
Edit `version.properties` to customize suffixes:
```properties
version.suffix.debug=-debug
version.suffix.alpha=-alpha
version.suffix.beta=-beta
version.suffix.rc=-rc
```

### Auto-Increment Settings
Configure automatic version bumping:
```properties
auto.increment.patch=true
auto.increment.minor=false
auto.increment.major=false
```

## 🚨 Best Practices

### Version Management
1. **Always use semantic versioning**: Follow MAJOR.MINOR.PATCH format
2. **Increment version code**: Every release must have a unique version code
3. **Update changelog**: Document all changes before release
4. **Test before release**: Always test the new version before deployment
5. **Use dry run**: Test version changes with `-DryRun` flag first

### Release Process
1. **Plan the release**: Determine appropriate version bump type
2. **Update changelog**: Document all changes
3. **Bump version**: Use version manager script
4. **Build and test**: Ensure everything works correctly
5. **Create release tag**: Tag the release in Git
6. **Deploy**: Upload to Google Play Store

### Changelog Guidelines
1. **Be descriptive**: Clearly describe what changed
2. **Use consistent language**: Follow established patterns
3. **Include user impact**: Explain how changes affect users
4. **Group related changes**: Organize changes logically
5. **Keep it updated**: Update changelog as you develop

## 🔍 Troubleshooting

### Common Issues

#### Version Manager Script Errors
- **File not found**: Ensure `version.properties` exists
- **Permission denied**: Run PowerShell as administrator
- **Execution policy**: Use `-ExecutionPolicy Bypass` if needed

#### Gradle Build Errors
- **Version code conflict**: Ensure version code is unique
- **Version name format**: Follow semantic versioning format
- **Build type issues**: Check build type configuration

#### Changelog Issues
- **Format errors**: Follow Keep a Changelog format
- **Missing entries**: Ensure all changes are documented
- **Date format**: Use YYYY-MM-DD format

## 📞 Support

### Documentation
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [Keep a Changelog](https://keepachangelog.com/)
- [Android Versioning](https://developer.android.com/studio/publish/versioning)

### Script Help
```powershell
# Show script help
Get-Help .\version-manager.ps1 -Detailed

# Show parameter help
Get-Help .\version-manager.ps1 -Parameter *
```

## 🎯 Next Steps

1. **Familiarize yourself**: Read this guide and understand the versioning system
2. **Practice**: Use dry run mode to test version bumping
3. **Customize**: Adjust version suffixes and settings as needed
4. **Integrate**: Incorporate version management into your development workflow
5. **Automate**: Consider integrating with CI/CD pipelines

The version management system is now ready to help you maintain consistent and professional versioning for your SmartFarm app! 