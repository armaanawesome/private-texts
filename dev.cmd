@echo off
REM ---------------------------------------------------------------------------
REM Starts Metro for an installed development build.
REM
REM Why this file exists: this machine's PowerShell execution policy is AllSigned
REM at the LocalMachine scope, and npm ships `npx.ps1` unsigned - so plain
REM `npx expo start` dies with "npx.ps1 is not digitally signed".
REM
REM A .cmd file runs through cmd.exe, which does not consult the PowerShell
REM execution policy at all. So this works regardless of the policy, needs no
REM admin rights, and changes no security setting.
REM
REM Usage, from PowerShell or cmd, in the project root:
REM     .\dev.cmd
REM
REM Then scan the QR code from the dev client on your phone, or open the printed
REM URL in the iOS simulator. Leave this window running while you test.
REM ---------------------------------------------------------------------------
setlocal

where npx.cmd >nul 2>&1
if errorlevel 1 (
  echo.
  echo   Could not find npx.cmd on PATH.
  echo   Node is normally at "C:\Program Files\nodejs" - add it to PATH.
  echo.
  exit /b 1
)

echo Starting Metro with a tunnel for the dev client...
echo Press Ctrl+C to stop.
echo.

npx.cmd expo start --tunnel --dev-client %*
