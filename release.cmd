@echo off
for /f "tokens=3 delims=;'= " %%a in ('findstr /R /C:"[ ]*var[ ]*__version__[ ]*=.*" /X keymap.html') do set "__version__=%%~a"
echo.
echo release version: %__version__%
echo.
pause

if exist release rmdir /s /q release
mkdir release

copy /y keymap.html release\
copy /y README.md release\
copy /y LICENSE release\
xcopy /s exe\dist\keymap\*.* release
copy /y exe\README.md release\README-keymap-exe.md
del release\_internal\libcrypto-1_1.dll
rmdir /s /q release\_internal\webui\webui-macos-clang-arm64
rmdir /s /q release\_internal\webui\webui-macos-clang-x64
cd release
zip keymap-%__version__%-html.zip keymap.html README.md LICENSE
zip -r keymap-%__version__%-exe-x64.zip keymap.* README* LICENSE _internal\
cd ..
exit /b
