pyinstaller -y -D -c ^
            --hide-console hide-early ^
            --collect-binaries webui ^
            keymap.py

if /I (%1)==(release) goto :release

exit /b

:release
if exist release rmdir /s /q release
mkdir release
xcopy /s dist\keymap\*.* release
xcopy ..\keymap.html release
del release\_internal\libcrypto-1_1.dll
rmdir /s /q release\_internal\webui\webui-macos-clang-arm64
rmdir /s /q release\_internal\webui\webui-macos-clang-x64
cd release
zip -r keymap-exe-x64.zip keymap.* _internal
cd ..
exit /b
