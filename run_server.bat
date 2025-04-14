@echo off
chcp 65001 >nul  & REM Set UTF-8 encoding in the console
python -X utf8 C:\Users\mfres\OneDrive\Документы\hostserver.py 8000 D:\VS\__WWW\about-me-2
exit /b
