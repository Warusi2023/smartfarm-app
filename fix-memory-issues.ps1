# Fix Memory Issues and Optimize Build Process
Write-Host "Fixing Memory Issues and Optimizing Build Process..." -ForegroundColor Green

# Step 1: Stop all Gradle daemons
Write-Host "Step 1: Stopping Gradle daemons..." -ForegroundColor Yellow
./gradlew --stop

# Step 2: Clean build cache
Write-Host "Step 2: Cleaning build cache..." -ForegroundColor Yellow
Remove-Item -Path ".gradle" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "build" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "app/build" -Recurse -Force -ErrorAction SilentlyContinue

# Step 3: Clean Android build cache
Write-Host "Step 3: Cleaning Android build cache..." -ForegroundColor Yellow
./gradlew clean

# Step 4: Test build with optimized settings
Write-Host "Step 4: Testing build with optimized memory settings..." -ForegroundColor Yellow
$env:GRADLE_OPTS = "-Xmx4096m -Xms1024m -XX:MaxMetaspaceSize=512m"
./gradlew :app:assembleDebug --no-daemon --parallel --max-workers=4

Write-Host "Memory optimization completed!" -ForegroundColor Green 