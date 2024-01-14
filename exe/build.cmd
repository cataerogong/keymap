@echo off
setlocal

set compiler=D:\Programs\AutoHotkey2\Compiler\Ahk2Exe.exe
set base=D:\Programs\AutoHotkey2\AutoHotkey64.exe

if exist keymap.ico set "icon=/icon keymap.ico"
if exist dist rmdir /s /q dist
mkdir dist
mkdir dist\keymap
mkdir dist\keymap\data

"%base%" encode.ahk2 keymap.py keymap.pye
"%compiler%" /base "%base%" /in keymap.ahk2 /out dist\keymap\keymap.exe %icon%
xcopy /s _runtime dist\keymap\_runtime\
