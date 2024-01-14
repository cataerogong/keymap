import os, sys
from webwin import WebWinApp

class KeymapApp(WebWinApp):
    def adjust_argparser(self):
        super().adjust_argparser()
        self.argparser.del_argument('--webroot')
        self.argparser.del_argument('--mainpage')
        self.argparser.del_argument('--del-js')
        self.argparser.del_argument('--run-js')
        self.argparser.add_argument('-P', metavar='profile', help='键谱名')
        self.argparser.add_argument('-L', choices=['0','1','2','3','4','5','6','7','8','9'], help='键盘层')
        self.argparser.add_argument('-V', choices=['k','l','j'], help='视图（键图/键表/数据）')
        self.argparser.add_argument('-S', choices=['0','1','2','3'], help='主键盘大小（隐藏/60%%/80%%/100%%）')
        self.argparser.add_argument('-X', choices=['0','1'], help='扩展键区（关闭/打开）')
        self.argparser.add_argument('-H', choices=['0','1'], help='键帽提示（关闭/打开）')
        self.argparser.add_argument('-M', choices=['t','s'], help='界面模式（分页/单页）')

app = KeymapApp()
os.chdir(app.PROG_DIR)
app.args.webroot = app.PROG_DIR
app.args.mainpage = "keymap.html"
app.run()
js = []
if (app.args.P):
    js.append(f'await UI.load("{app.args.P}");')
if (app.args.L is not None):
    js.append(f'Keymap.CurLayer={app.args.L};')
if (app.args.V):
    js.append(f'Keymap.Config.view="{app.args.V}";')
if (app.args.S):
    js.append(f'Keymap.Config.kbsize={app.args.S};')
if (app.args.X):
    js.append(f'Keymap.Config.kbext={"false" if (app.args.X=="0") else "true"};')
if (app.args.H):
    js.append(f'Keymap.Config.kbhint={"false" if (app.args.H=="0") else "true"};')
if (app.args.M):
    js.append(f'Keymap.Config.uimode="{"single" if (app.args.M=="s") else "tab"}";')
if len(js):
    run_js = f'''(async () => {{ {"".join(js)} UI.update(); }})();'''
    app.mainwin.run_js(run_js)
app.wait()