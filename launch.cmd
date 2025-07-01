@echo off
title Neeric AWS Cleaner Dashboard
echo.
echo ==========================================
echo  🚀 Neeric AWS Cleaner - Dashboard
echo ==========================================
echo.
echo Starting Dashboard...
echo Open your browser to: http://localhost:5174
echo.
echo Dashboard will show both:
echo   - Landing Page: http://localhost:5174
echo   - AWS Scanner:  http://localhost:5174/dashboard
echo.
echo Press Ctrl+C to stop
echo.

start http://localhost:5174
npm run dev 