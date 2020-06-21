#Directories
$CurrentDir = (Get-Item -Path ".\" -Verbose).FullName
$OutputFile = Join-Path $CurrentDir code_health_results.txt

function Check-Result {
	if ($LastExitCode -eq 0) {
		Write-Host "[OK]" -foreground "green"
	} else {
		Write-Host "[FAILED]" -foreground "red"
		Exit-Test 1
	}
}

function Exit-Test {
	Param([int] $ReturnCode)

	if ($ReturnCode -eq 0) {
		Write-Host "Check code_health_results.txt for details."
	} else {
		Write-Host "Check code_health_results.txt for details." -foreground "red"
	}
	Write-Host ""
	
	Set-Location -Path $CurrentDir
	exit $ReturnCode
}

# BUILD & RESTORES

Write-Host ""

$ApiDir = Join-Path $CurrentDir api

# Check API health"
Set-Location -Path $ApiDir

Write-Host -NoNewline "API: Restore (npm)... "
npm install --silent --no-progress >> $OutputFile
Check-Result

Write-Host -NoNewline "API: Lint... "
& npm run lint >> $OutputFile
Check-Result

# Write-Host -NoNewline "API: Test... "
# & npm run test >> $OutputFile
# Check-Result

Exit-Test
