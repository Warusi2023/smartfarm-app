# PowerShell script to check generated SQLDelight code
# Run after: ./gradlew :shared:compileKotlinAndroid

$generatedPath = "shared\build\generated\sqldelight\code\Database\FarmDatabase.kt"

if (Test-Path $generatedPath) {
    Write-Host "✅ SQLDelight code generated!" -ForegroundColor Green
    Write-Host "Location: $generatedPath" -ForegroundColor Cyan
    
    $content = Get-Content $generatedPath -Raw
    Write-Host "`nChecking query access patterns..." -ForegroundColor Yellow
    
    if ($content -match "fun getAllFarms\(\)") {
        Write-Host "✅ Pattern: database.getAllFarms()" -ForegroundColor Green
    } elseif ($content -match "farmQueries") {
        Write-Host "✅ Pattern: database.farmQueries.getAllFarms()" -ForegroundColor Green
    } elseif ($content -match "farmDatabaseQueries") {
        Write-Host "✅ Pattern: database.farmDatabaseQueries.getAllFarms()" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Unknown pattern - check file manually" -ForegroundColor Yellow
    }
    
    Write-Host "`nOpening generated file..." -ForegroundColor Cyan
    code $generatedPath
} else {
    Write-Host "❌ Generated code not found!" -ForegroundColor Red
    Write-Host "Run: ./gradlew :shared:compileKotlinAndroid" -ForegroundColor Yellow
}

