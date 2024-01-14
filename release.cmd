@echo off
for /f "tokens=3 delims=;'= " %%a in ('findstr /R /C:"[ ]*var[ ]*__version__[ ]*=.*" /X keymap.html') do set "__version__=%%~a"
echo.
echo release version: %__version__%
echo.
pause

if exist pack_tmp rmdir /s /q pack_tmp
mkdir pack_tmp
mkdir pack_tmp\data

copy /y keymap.html pack_tmp\
copy /y README.md pack_tmp\
copy /y LICENSE pack_tmp\
xcopy /s exe\dist\keymap\keymap.exe pack_tmp
xcopy /s exe\dist\keymap\_runtime\ pack_tmp\_runtime\
copy /y exe\README.md pack_tmp\README-keymap-exe.md

if not exist release mkdir release
if exist release\keymap-%__version__%-html.zip del release\keymap-%__version__%-html.zip
if exist release\keymap-%__version__%-exe-x64.zip del release\keymap-%__version__%-exe-x64.zip

cd pack_tmp
..\zip ..\release\keymap-%__version__%-html.zip keymap.html README.md LICENSE
..\zip -r ..\release\keymap-%__version__%-exe-x64.zip keymap.* README* LICENSE _runtime\ data\
cd ..
exit /b
