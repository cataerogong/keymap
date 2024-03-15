@echo off
for /f "tokens=3 delims=;'= " %%a in ('findstr /R /C:"[ ]*var[ ]*__version__[ ]*=.*" /X keymap.html') do set "__version__=%%~a"
echo.
echo release version: %__version__%
echo.
pause

pushd exe
call build
popd

if exist pack_tmp rmdir /s /q pack_tmp
mkdir pack_tmp\data
copy /y keymap.html pack_tmp\
copy /y README.md pack_tmp\
copy /y MANUAL.md pack_tmp\
copy /y LICENSE pack_tmp\
copy /y *.example.* pack_tmp\
xcopy /y /s js\ pack_tmp\js\
xcopy /y /s keymaps\ pack_tmp\keymaps\
copy /y exe\dist\keymap\keymap.exe pack_tmp\
xcopy /y /s exe\dist\keymap\_runtime\ pack_tmp\_runtime\
copy /y exe\README.md pack_tmp\README-exe.md
copy /y exe\dist\keymap\keymapTray.exe pack_tmp\
copy /y exe\dist\keymap\keymapTray.ini pack_tmp\

if not exist release mkdir release
if exist release\keymap-%__version__%-all.zip del release\keymap-%__version__%-all.zip
if exist release\keymap-%__version__%-html.zip del release\keymap-%__version__%-html.zip
pushd pack_tmp
zip -r ..\release\keymap-%__version__%-html.zip keymap.html README.md MANUAL.md LICENSE *.example.* js\ keymaps\
zip -r ..\release\keymap-%__version__%-all.zip *
popd

exit /b
