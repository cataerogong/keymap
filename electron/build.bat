chcp 65001
rmdir /s/q dist
xcopy /e/c/y ..\js\ js\
copy /y ..\keymap.html index.html
copy /y ..\icon.ico icon.ico

npx electron-builder
