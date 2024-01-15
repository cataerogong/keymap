@echo off
for /f "tokens=3 delims=;'= " %%a in ('findstr /R /C:"[ ]*var[ ]*__version__[ ]*=.*" /X keymap.html') do set "__version__=%%~a"
echo.
echo release version: %__version__%
echo.
pause

if not exist release mkdir release

if "%~1" neq "" goto :%~1

call :html
call :exe

exit /b

:html
if exist release\keymap-%__version__%-html.zip del release\keymap-%__version__%-html.zip
zip release\keymap-%__version__%-html.zip keymap.html README.md LICENSE
exit /b

:exe
if exist pack_tmp rmdir /s /q pack_tmp
mkdir pack_tmp
mkdir pack_tmp\data

copy /y keymap.html pack_tmp\
copy /y README.md pack_tmp\
copy /y LICENSE pack_tmp\
xcopy /s exe\dist\keymap\keymap.exe pack_tmp
xcopy /s exe\dist\keymap\_runtime\ pack_tmp\_runtime\
copy /y exe\README.md pack_tmp\README-keymap-exe.md

if exist release\keymap-%__version__%-exe-x64.zip del release\keymap-%__version__%-exe-x64.zip
cd pack_tmp
..\zip -r ..\release\keymap-%__version__%-exe-x64.zip keymap.* README* LICENSE _runtime\ data\
cd ..
exit /b
