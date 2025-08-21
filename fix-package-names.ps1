# Simple Package Name Fixer
Write-Host "Fixing package names from com.example.smartfarm to com.yourcompany.smartfarm"
Write-Host "================================================================"
Write-Host ""

$oldPackage = "com.example.smartfarm"
$newPackage = "com.yourcompany.smartfarm"

# Find all Kotlin and Java files
$files = Get-ChildItem -Path "." -Recurse -Include "*.kt", "*.java" | Where-Object { $_.FullName -notlike "*\build\*" -and $_.FullName -notlike "*\.git\*" }

$updatedFiles = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match $oldPackage) {
        $newContent = $content -replace $oldPackage, $newPackage
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $updatedFiles++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host ""
Write-Host "Total files updated: $updatedFiles"
Write-Host "Package names fixed successfully!"
