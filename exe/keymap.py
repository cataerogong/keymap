from webwin import WebWinApp

app = WebWinApp(enable_cmdline_args=False)
app.args.webroot = app.PROG_DIR
app.args.mainpage = "keymap.html"
app.run()
app.wait()