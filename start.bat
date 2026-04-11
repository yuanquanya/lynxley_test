@echo off
chcp 65001 >nul
title React Dev Server
cd /d "%~dp0"
call npm run dev
pause
