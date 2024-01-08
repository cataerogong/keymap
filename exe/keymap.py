from webwin import WebWinApp

class KeymapApp(WebWinApp):
    def adjust_argparser(self):
        super().adjust_argparser()
        self.argparser.del_argument('--webroot')
        self.argparser.del_argument('--mainpage')
        self.argparser.del_argument('--del-js')
        self.argparser.del_argument('--run-js')
        self.argparser.add_argument('-P', metavar='profile', help='键谱配置名')
        self.argparser.add_argument('-L', choices=['0','1','2','3','4'], help='键盘层')
        self.argparser.add_argument('-S', choices=['1','2','3','4'], help='键盘大小（60%%,80%%,100%%,扩展）')
        self.argparser.add_argument('-V', choices=['kb', 'list'], help='界面（键图，键表）')
        self.argparser.add_argument('-H', choices=['true', 'false'], help='键帽提示')

app = KeymapApp()
app.args.webroot = app.PROG_DIR
app.args.mainpage = "keymap.html"
app.run()
js = []
if (app.args.P):
    js.append(f'await UI.load("{app.args.P}");')
if (app.args.L is not None):
    js.append(f'Keymap.Config.layer={app.args.L};')
if (app.args.S):
    js.append(f'Keymap.Config.kbsize={app.args.S};')
if (app.args.V):
    js.append(f'Keymap.Config.view="{app.args.V.lower()}";')
if (app.args.H):
    js.append(f'Keymap.Config.kbhint={app.args.H.lower()};')
if len(js):
    run_js = f'''(async () => {{ {"".join(js)} UI.update(); }})();'''
    print(run_js)
    app.mainwin.run_js(run_js)
app.wait()