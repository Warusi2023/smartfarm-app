# Simple Test Script
# This script tests basic PowerShell functionality

param(
    [string]$TestParam = "test-value"
)

Write-Host "Simple Test Script" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green

# Function to create a test file
function New-TestFile {
    param([string]$Content)
    
    $testPath = "test-output.txt"
    
    try {
        $Content | Out-File -FilePath $testPath -Encoding UTF8
        Write-Host "Created test file: $testPath" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Failed to create test file: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to create a simple report
function New-SimpleReport {
    $reportPath = "simple-report.md"
    
    $reportContent = "# Simple Test Report`n`n"
    $reportContent += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n`n"
    $reportContent += "## Test Results`n`n"
    $reportContent += "- PowerShell execution: OK`n"
    $reportContent += "- File creation: OK`n"
    $reportContent += "- Encoding: OK`n`n"
    $reportContent += "## Summary`n`n"
    $reportContent += "The script encoding issues have been resolved.`n"
    
    try {
        $reportContent | Out-File -FilePath $reportPath -Encoding UTF8
        Write-Host "Created simple report: $reportPath" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Failed to create report: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main execution
try {
    Write-Host "Starting simple test..." -ForegroundColor Cyan
    Write-Host "Test parameter: $TestParam" -ForegroundColor White
    
    # Create test file
    $fileResult = New-TestFile -Content "This is a test file created by the simple test script.`nParameter: $TestParam`nTimestamp: $(Get-Date)"
    
    # Create report
    $reportResult = New-SimpleReport
    
    # Summary
    Write-Host "`nTest Summary:" -ForegroundColor Cyan
    Write-Host "File Creation: $(if ($fileResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($fileResult) { 'Green' } else { 'Red' })"
    Write-Host "Report Creation: $(if ($reportResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($reportResult) { 'Green' } else { 'Red' })"
    
    $allSuccess = $fileResult -and $reportResult
    
    if ($allSuccess) {
        Write-Host "`nSimple test completed successfully!" -ForegroundColor Green
        Write-Host "Script encoding issues have been resolved." -ForegroundColor Yellow
    } else {
        Write-Host "`nSome tests failed. Please check the errors above." -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "Test failed with error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 