@echo off
REM ---------------------------------------------------------------------------
REM Typecheck + full test suite. Run before trusting a change.
REM
REM Same reason as dev.cmd: cmd.exe ignores the PowerShell execution policy that
REM blocks npm's unsigned `npx.ps1` on this machine.
REM
REM     .\check.cmd
REM ---------------------------------------------------------------------------
setlocal

where npx.cmd >nul 2>&1
if errorlevel 1 (
  echo   Could not find npx.cmd on PATH. Node is normally at "C:\Program Files\nodejs".
  exit /b 1
)

echo === typecheck ===
call npx.cmd tsc --noEmit
if errorlevel 1 (
  echo.
  echo   TYPECHECK FAILED
  exit /b 1
)
echo   clean
echo.

echo === tests ===
call npx.cmd vitest run
if errorlevel 1 (
  echo.
  echo   TESTS FAILED
  exit /b 1
)

echo.
echo   All green.
