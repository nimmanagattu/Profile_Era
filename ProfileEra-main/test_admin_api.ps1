# Test Admin API for Profile Era
# Run this script in PowerShell to see your Admin Dashboard data

$API_KEY = "secret123" # Change this to match your .env ADMIN_API_KEY
$BASE_URL = "http://localhost:5000/api/admin"

Write-Host "`n--- Checking Admin Authentication ---" -ForegroundColor Cyan
try {
    $verify = Invoke-RestMethod -Uri "$BASE_URL/verify" -Headers @{"x-admin-api-key"=$API_KEY} -Method Get
    Write-Host "Success: $($verify.message)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n--- Fetching All Leads (Admin Dashboard) ---" -ForegroundColor Cyan
try {
    $leads = Invoke-RestMethod -Uri "$BASE_URL/leads" -Headers @{"x-admin-api-key"=$API_KEY} -Method Get
    if ($leads.Count -eq 0) {
        Write-Host "No leads found in database." -ForegroundColor Yellow
    } else {
        $leads | ConvertTo-Json -Depth 5
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n---------------------------------------"
Write-Host "Test Complete." -ForegroundColor Cyan
