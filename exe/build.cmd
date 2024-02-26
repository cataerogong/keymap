@echo off
setlocal

set compiler=D:\Programs\AutoHotkey2\Compiler\Ahk2Exe.exe
set base=D:\Programs\AutoHotkey2\AutoHotkey64.exe

if exist keymap.ico set "icon=/icon keymap.ico"

if "%~1" neq "" goto :%~1

call :clean
call :exe
call :tray

exit /b

:clean
if exist dist rmdir /s /q dist
exit /b

:exe
if not exist dist\keymap\data mkdir dist\keymap\data
"%base%" encode.ahk2 keymap.py keymap.pye
"%compiler%" /base "%base%" /in keymap.ahk2 /out dist\keymap\keymap.exe %icon%
xcopy /y /s _runtime dist\keymap\_runtime\
exit /b

:tray
if not exist dist\keymap\data mkdir dist\keymap\data
"%compiler%" /base "%base%" /in keymapTray.ahk2 /out dist\keymap\keymapTray.exe %icon%
copy /y keymapTray.ini dist\keymap\
exit /b
