param(
  [Parameter(Mandatory = $true)]
  [string]$RepoRoot
)

$ErrorActionPreference = "Stop"
$PackageDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = (Resolve-Path $RepoRoot).Path

& git -C $RepoRoot rev-parse --show-toplevel *> $null
if ($LASTEXITCODE -ne 0) { throw "Target is not a Git repository: $RepoRoot" }

$Branch = (& git -C $RepoRoot branch --show-current).Trim()
if ($Branch -eq "main") { throw "Refusing to apply directly on main. Create a working branch first." }

$Targets = @(
  "src/components/home/homepage.module.css",
  "src/components/home/latest-guides.module.css",
  "src/components/layout/mobile-menu.tsx",
  "tests/e2e/homepage-visual-audit.spec.ts"
)

foreach ($RelativePath in ($Targets + "src/app/globals.css")) {
  if (-not (Test-Path (Join-Path $RepoRoot $RelativePath) -PathType Leaf)) {
    throw "Expected Stage 1.2 file is missing: $RelativePath"
  }
}

$PatchPath = Join-Path $PackageDir "patches/globals.css.patch"
& git -C $RepoRoot apply --check $PatchPath
if ($LASTEXITCODE -ne 0) { throw "globals.css patch does not match this checkout. No files were copied." }

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$BackupRoot = Join-Path $RepoRoot ".patch-backups/stage-1.2-audit/$Stamp"
New-Item -ItemType Directory -Force -Path $BackupRoot | Out-Null

foreach ($RelativePath in ($Targets + "src/app/globals.css")) {
  $Source = Join-Path $RepoRoot $RelativePath
  $Backup = Join-Path $BackupRoot $RelativePath
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Backup) | Out-Null
  Copy-Item -LiteralPath $Source -Destination $Backup
}

& git -C $RepoRoot apply $PatchPath
if ($LASTEXITCODE -ne 0) { throw "Could not apply globals.css patch. Original files are backed up at $BackupRoot" }

foreach ($RelativePath in $Targets) {
  $Source = Join-Path $PackageDir $RelativePath
  $Destination = Join-Path $RepoRoot $RelativePath
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Destination) | Out-Null
  Copy-Item -LiteralPath $Source -Destination $Destination -Force
}

& git -C $RepoRoot diff --check
if ($LASTEXITCODE -ne 0) { throw "git diff --check failed. Original files are backed up at $BackupRoot" }

Write-Host "BuddyDays audit fixes applied."
Write-Host "Branch: $Branch"
Write-Host "Backups: $BackupRoot"
Write-Host "Next: npm ci; npm run lint; npm run typecheck; npm test; npm run build; npm run test:e2e"
