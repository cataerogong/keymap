@echo off
pyinstaller -y -D -c ^
            --hide-console hide-early ^
            --collect-binaries webui ^
            keymap.py
