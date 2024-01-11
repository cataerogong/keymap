const KEY_TABLE = {
    // "0": [''], "1": [''], "2": [''], "3": [''], "4": [''], "5": [''], "6": [''], "7": [''], "8": [''], "9": [''],
    // "A": [''], "B": [''], "C": [''], "D": [''], "E": [''], "F": [''], "G": [''], "H": [''], "I": [''], "J": [''],
    // "K": [''], "L": [''], "M": [''], "N": [''], "O": [''], "P": [''], "Q": [''], "R": [''], "S": [''], "T": [''],
    // "U": [''], "V": [''], "W": [''], "X": [''], "Y": [''], "Z": [''],
    // ";": [''], "=": [''], ",": [''], "-": [''], ".": [''], "/": [''], "`": [''], "[": [''], "\\": [''], "]": [''], "'": [''],
    // "F1": [''], "F2": [''], "F3": [''], "F4": [''], "F5": [''], "F6": [''], "F7": [''], "F8": [''], "F9": [''], "F10": [''], "F11": [''], "F12": [''],
    // "Alt": [''], "RAlt": [''], "Backspace": [''], "Caps": [''], "Ctrl": [''], "RCtrl": [''], "Del": [''], "Down": ['↓'], "End": [''], "Enter": [''], "REnter": [''], "Esc": [''],
    // "Home": [''], "Ins": [''], "Left": ['←'], "Menu": [''], "Pause": [''], "PgDn": [''], "PgUp": [''], "PrtScr": [''], "Right": ['→'],
    // "ScrLck": [''], "Shift": [''], "RShift": [''], "Space": [''], "Tab": [''], "Up": ['↑'], "Win": [''],
    // "NumLck": [''], "Num-": ['-'], "Num*": ['*'], "Num.": ['.'], "Num/": ['/'], "Num+": ['+'],
    // "Num0": ['0'], "Num1": ['1'], "Num2": ['2'], "Num3": ['3'], "Num4": ['4'], "Num5": ['5'], "Num6": ['6'], "Num7": ['7'], "Num8": ['8'], "Num9": ['9'],
    // // "F13": [''], "F14": [''], "F15": [''], "F16": [''], "F17": [''], "F18": [''], "F19": [''], "F20": [''], "F21": [''], "F22": [''], "F23": [''], "F24": [''], "F25": [''], "F26": [''], "F27": [''], "F28": [''], "F29": [''], "F30": [''],
    // // "LB": [''], "RB": [''], "MB": [''], "WhlUp": [''], "WhlDn": [''],
    "0": '', "1": '', "2": '', "3": '', "4": '', "5": '', "6": '', "7": '', "8": '', "9": '',
    "A": '', "B": '', "C": '', "D": '', "E": '', "F": '', "G": '', "H": '', "I": '', "J": '',
    "K": '', "L": '', "M": '', "N": '', "O": '', "P": '', "Q": '', "R": '', "S": '', "T": '',
    "U": '', "V": '', "W": '', "X": '', "Y": '', "Z": '',
    ";": '', "=": '', ",": '', "-": '', ".": '', "/": '', "`": '', "[": '', "\\": '', "]": '', "'": '',
    "F1": '', "F2": '', "F3": '', "F4": '', "F5": '', "F6": '', "F7": '', "F8": '', "F9": '', "F10": '', "F11": '', "F12": '',
    "Esc": '', "Tab": '', "Shift": '', "RShift": '', "Backspace": '', "Caps": '', "Enter": '', "REnter": '', "Space": '',
    "PrtScr": '', "ScrLck": '', "Pause": '', "Ins": '', "Del": '', "Home": '', "End": '', "PgUp": '', "PgDn": '',
    "Up": '↑', "Down": '↓', "Left": '←', "Right": '→',
    "NumLck": '', "Num-": '-', "Num*": '*', "Num.": '.', "Num/": '/', "Num+": '+',
    "Num0": '0', "Num1": '1', "Num2": '2', "Num3": '3', "Num4": '4', "Num5": '5', "Num6": '6', "Num7": '7', "Num8": '8', "Num9": '9',
    "Alt": '', "RAlt": '', "Ctrl": '', "RCtrl": '', "Win": '', "Menu": '',
    "esc": '', "delete": '', "tab": '', "capslock": '', "return": '', "shift": '', "r-shift": '',
    "control": 'ctrl', "option": '', "command": '', "r-option": 'r-opt', "r-command": '', "fn": '',
    // "F13": '', "F14": '', "F15": '', "F16": '', "F17": '', "F18": '', "F19": '', "F20": '', "F21": '', "F22": '', "F23": '', "F24": '', "F25": '', "F26": '', "F27": '', "F28": '', "F29": '', "F30": '',
    // "LB": '', "RB": '', "MB": '', "WhlUp": '', "WhlDn": '', 
};
const MOD_KEYS_PC = ["Alt", "Ctrl", "Shift", "Win"];
const MOD_KEYS_MAC = ["fn", "control", "option", "command", "shift"];
// const DEFAULT_PROF = "DEFAULT";

var Util = {
    split_combo(combo_str) {
        return combo_str.replaceAll("Num+", "NumPlus").replaceAll("+", "_+_").replaceAll("NumPlus", "Num+").split("_+_");
    },

    get_mainkey(combo_str) {
        let l = this.split_combo(combo_str);
        return l[l.length - 1];
    },

    between(v, min, max) {
        return (v < min) ? min : ((v > max) ? max : v);
    },

    is_empty_obj(obj) {
        for (const v in obj) return false;
        return true;
    },

    patch_obj(dst, src) {
        for (const k in src) {
            if (!(k in dst))
                dst[k] = src[k];
        }
    },

    copy_obj(dst, src) {
        // for (const k in src) {
        //     dst[k] = src[k];
        // }
        Object.assign(dst, src);
    },

    gen_combo_kn_elm(kn) {
        let ck = this.split_combo(kn);
        let mk = ck[ck.length - 1];
        let l = [];
        for (const k of ck) {
            l.push(`<kn ${k==mk?"":' class="ck"'}>${k}</kn>`);
        }
        return `<span data-mainkey="${mk}" class="kinfo f-end">${l.join("+")}</span>`;
    },
};

const NEW_KEYMAP = "+ 新建";
const HELP_KEYMAP = "* 帮助";
const HELP = `【备注】这里是备注框，可以为每个键盘层备注信息。

【试验】这是一个虚拟的键谱，你可以在这里试验各种操作，重新载入“${HELP_KEYMAP}”即可恢复原样。

【帮助】
  * 鼠标指向顶部的“键谱名”，可以新建和切换键谱。
  * 点击键盘图中的按键，可以录入按键映射信息。
  * 组合键：在录入时可以选择组合修饰键（Alt、Ctrl、Shift、Win）。
  * 一个按键上可以录入多组组合键。
  * 映射信息以"* "（星号+空格）开头的组合键定义为主映射，在“键帽提示”模式下会在键帽上显示第一行文字，并且主映射的组合键会直接显示在键帽上。
  * 每个键谱的当前状态都会实时保存（除了“当前键盘层”），在下次打开时会自动恢复。因此，可以为每个键谱设置不同的显示风格。

【谱匣】通过谱匣程序使用键谱时，可以使用命令行参数(-PLVSH)自定义载入的键谱及界面。不需提供所有参数，未提供的参数会按键谱中保存的状态显示。
  -P 键谱名
  -L 键盘层 : [0~5]
  -V 视图 : [k/l/j] 键图 / 键表 / 数据
  -S 键盘大小 : [1~4] 60% / 80% / 标准 / 扩展
  -H 键帽提示 : [0/1] 关闭 / 打开
  示例：打开键谱“Photoshop”，切换到层2，显示键图，60%键盘大小，打开键帽提示。
    keymap.exe -P Photoshop -L 2 -V k -S 1 -H 1
`;
const KeymapHelp = {
    "#NAME": HELP_KEYMAP,
    "#0": {
        "1": "* 键盘层 1",
        "2": "* 键盘层 2",
        "3": "* 键盘层 3",
        "4": "* 键盘层 4",
        "5": "* 键盘层 5",
        "6": "* 键盘层 6",
        "7": "* 键盘层 7",
        "8": "* 键盘层 8",
        "9": "* 键盘层 9",
        "`": "* 键盘层 0",
        "Q": "* 60% 键盘 ",
        "W": "* 80% 键盘",
        "E": "* 标准键盘",
        "R": "* 扩展键盘",
        "Tab": "* 切换键帽提示",
        "tab": "* 切换键帽提示",
        "A": "* 键图",
        "S": "* 键表",
        "D": "* 数据",
        "K": "* 键图",
        "L": "* 键表",
        "J": "* 数据",
        "P": "* 切换打印模式",
        "M": "* 切换布局\n切换 PC / Mac 键盘布局",
        "#comment": HELP
    },
    "#config": {
        "layout": "pc",
        "view": "k",
        "kbsize": 4,
        "kbhint": true,
        "extkeys": ["#Fn", "F13", "F14", "F15", "F16", "#", "F17", "F18", "F19", "F20", "#", "F21", "F22", "F23", "F24", "/", "#鼠标", "LB", "RB", "MB", "WhlUp", "WhlDn"],
        "modkeys": ["RAlt", "RCtrl", "RShift", "Caps"],
    }
};

var Keymap = {
    Name: "",
    _data: null,
    _cur_layer: 0,
    _virtual: false,

    _keytable: {},
    _extkeys: [],
    _layout: "",

    _default_cfg: {
        "layout": "pc",
        "layers": 10,
        "view": "k",
        "kbsize": 3,
        "kbhint": false,
        "ks1": 0.8,
        "kw1": 3,
        "kh1": 3,
        "ks2": 0.9,
        "kw2": 5,
        "kh2": 5,
        "kt2": 0.8,
        "c0": "black",
        "c1": "lightblue",
        "c2": "lightseagreen",
        "c3": "black",
        "c4": "lightgray",
        "cols": 2,
        "extkeys": [],
        "modkeys": [],
    },

    get _default_keymap() {
        return JSON.parse(`{"#0":{}, "#config": ${JSON.stringify(this._default_cfg)}}`);
    },

    init(name = "") {
        this.Name = name;
        this._data = this._default_keymap;
        this._cur_layer = 0;
        this._virtual = false;
    },

    // fixStruct(kmap) {
    //     // check config
    //     if (!("#config" in kmap))
    //         kmap["#config"] = {};
    //     Util.patch_obj(kmap["#config"], this._default_cfg);
    //     // check layers
    //     for (let i=0; i<=4; i++) {
    //         if (!(("#"+i) in kmap))
    //         kmap["#"+i] = {};
    //     }
    //     // migrate data v1 to v2
    //     for (const k in kmap) {
    //         if (k.startsWith("#layer-")) {
    //             let ln = k.slice(7);
    //             Object.assign(kmap["#"+ln], kmap[k]);
    //         } else {
    //             if (k[0] == "#") continue;
    //             if (kmap[k])
    //                 kmap["#0"][k] = kmap[k];
    //         }
    //         delete kmap[k];
    //     }
    // },

    loadJSON(json_str) {
        if (!json_str)
            return false;
        let temp = null;
        try {
            temp = JSON.parse(json_str);
            // this.fixStruct(temp);
        } catch (e) {
            console.log(e);
            return false;
        }
        // this._data = temp;
        this._data = this._default_keymap;
        for (const k in temp) {
            if (!temp[k]) continue;
            if (k.toLowerCase() == "#config") {
                Util.copy_obj(this.Config, temp[k]);
            // } else if (k.toLowerCase().startsWith("#layer-")) {
            //     let ln = k.slice(7);
            //     Util.copy_obj(this.data["#"+ln], temp[k]);
            } else if (k[0] != "#") {
                this.Layer(0)[k] = temp[k];
            } else {
                this._data[k] = temp[k];
            }
        }
        // // keytable
        // for (const k in KEY_TABLE) {
        //     // this._keytable[k] = Object.assign([], KEY_TABLE[k]);
        //     this._keytable = Object.assign({}, KEY_TABLE);
        // }
        // // extkeys
        // this.ExtKeys = this.Config.extkeys;
        // this._cur_layer = 0;
        // this._locked = false;
        return true;
    },

    clear() {
        this._data = this._default_keymap;
        this._cur_layer = 0;
    },

    shrink() {
        for (const k in this._data) {
            if (!this._data[k] || Util.is_empty_obj(this._data[k]))
                delete this._data[k];
        }
    },

    get JSON() {
        return JSON.stringify(this._data, null, 2);
    },

    get Config() {
        return this._data["#config"];
    },

    get CurLayer() {
        return this._cur_layer;
    },

    set CurLayer(ln) {
        this.checkLayer(ln);
        this._cur_layer = ln;
    },

    checkLayer(ln) {
        if (ln < 0 || ln >= this.Config.layers) {
            throw RangeError("Layer # error: " + ln);
        }
    },

    Layer(ln = null) {
        if (ln == null)
            ln = this.CurLayer;
        this.checkLayer(ln);
        if (!(("#"+ln) in this._data))
            this._data["#"+ln] = {}
        return this._data["#"+ln];
    },

    clearLayer(ln = null) {
        if (ln == null)
            ln = this.CurLayer;
        this.checkLayer(ln);
        this._data["#"+ln] = {};
    },

    getMapping(kn, ln = null) {
        return (kn in this.Layer(ln)) ? this.Layer(ln)[kn] : null;
    },

    getAllMappings(mk, ln = null) {
        let ret = {};
        for (const kn in this.Layer(ln)) {
            if (Util.get_mainkey(kn) == mk && this.Layer(ln)[kn]) {
                ret[kn] = this.Layer(ln)[kn];
            }
        }
        return ret;
    },

    setMapping(kn, info, ln = null) {
        if (info) {
            this.Layer(ln)[kn] = info;
        } else {
            delete this.Layer(ln)[kn];
        }
    },

    // Storage Methods
    async load(name = null) {
        this.init();
        this.Name = name || this.Name;
        if (!this.Name) {
            return false;
        }
        let json_ = await _PROFILE_.read(this.Name);
        return Boolean(json_ && this.loadJSON(json_));
    },
    async save() {
        this.shrink();
        if (this._virtual) return;
        if (!this.Name) return;
        await _PROFILE_.write(this.Name, this.JSON);
    },
    async del() {
        if (this._virtual) return;
        if (!this.Name) return;
        await _PROFILE_.del(this.Name);
        this.init();
    },
    loadHelp() {
        this.loadJSON(JSON.stringify(KeymapHelp));
        this.Name = KeymapHelp["#NAME"];
        this._cur_layer = 0;
        this._virtual = true;
    },

    // get KeyTable() {
    //     return this._keytable;
    // },

    // // 自定义扩展键
    // get ExtKeys() {
    //     return this._extkeys;
    // },
    // set ExtKeys(v) {
    //     let temp = [];
    //     for (const k of v) {
    //         if (k)
    //             temp.push(k)
    //     }
    //     this.Config.extkeys = temp;
    //     this._extkeys = Object.assign([], this.Config.extkeys);
    //     for (const k of this._extkeys) {
    //         this._keytable[k] = '';
    //     }
    // },
    get KeyTable() {
        if (this._layout != this.Config.layout || this._extkeys != this.Config.extkeys) {
            this._layout = this.Config.layout;
            this._extkeys = this.Config.extkeys;
            this._keytable = Object.assign({}, KEY_TABLE);
            for (const k of this.Config.extkeys) {
                this._keytable[k] = '';
            }
        }
        return this._keytable;
    },

    // 自定义修饰键
    get ModKeys() {
        return (this.Config.layout == "mac" ? MOD_KEYS_MAC : MOD_KEYS_PC).concat(this.Config.modkeys);
    },

    isModKey(k) {
        return this.ModKeys.includes(k);
    },
}

var UI = {
    elm(sel) {
        return document.querySelector(sel);
    },

    elms(sel) {
        return document.querySelectorAll(sel);
    },

    setFlag(name, value) {
        if (value === null)
            document.documentElement.removeAttribute("data-" + name);
        else
            document.documentElement.setAttribute("data-" + name, value);
    },

    toggleFlag(name, value) {
        if (document.documentElement.getAttribute("data-" + name))
            document.documentElement.removeAttribute("data-" + name);
        else
            document.documentElement.setAttribute("data-" + name, value);
    },

    setCSS(prop, val) {
        if (!prop || !val) return false;
        for (const sheet of document.styleSheets) {
            for (const rule of sheet.cssRules) {
                if (rule.selectorText === ":root") {
                    rule.style.setProperty(prop, val);
                    return true;
                }
            }
        }
        document.styleSheets[document.styleSheets.length - 1].insertRule(`${sel} {${prop}: ${val}}`);
        return true;
    },

    update() {
        this.elm("#prof_name").innerText = Keymap.Name || NEW_KEYMAP;
        this.elm("#prof_name").title = Keymap.Name;
        this.Keyboard.update();
        this.List.update();
        this.Json.update();

        let elm = this.elm("#layer_btns");
        elm.innerHTML = "";
        for (let n=0; n<Keymap.Config.layers; n++) {
            let e = document.createElement("button");
            e.id = "btn_l" + n;
            e.classList.add("btn_l");
            if (n == Keymap.CurLayer)
                e.classList.add("btn_l_cur");
            e.innerHTML = String(n);
            e.onclick = (evt) => {
                this.changeLayer(n);
                this.update();
            };
            // `<button id="btn_l${n}" class="btn">${n}</button>`
            elm.appendChild(e);
        }

        this.setFlag('layer', Keymap.CurLayer);
        let cfg = Keymap.Config;
        cfg.kbsize = Util.between(cfg.kbsize, 1, 4);
        this.setFlag("view", cfg.view);
        this.setFlag("kbsize", cfg.kbsize);
        this.setFlag("kbhint", cfg.kbhint);
        this.setFlag("layout", cfg.layout);
        this.setCSS("--ks1", cfg["ks1"]);
        this.setCSS("--kw1", cfg["kw1"]);
        this.setCSS("--kh1", cfg["kh1"]);
        this.setCSS("--ks2", cfg["ks2"]);
        this.setCSS("--kw2", cfg["kw2"]);
        this.setCSS("--kh2", cfg["kh2"]);
        this.setCSS("--kt2", cfg["kt2"]);
        this.setCSS("--c0", cfg["c0"]);
        this.setCSS("--c1", cfg["c1"]);
        this.setCSS("--c2", cfg["c2"]);
        this.setCSS("--c3", cfg["c3"]);
        this.setCSS("--c4", cfg["c4"]);
        this.setCSS("--cols", cfg["cols"]);
        this.resize();
    },

    resize() {
        this.setCSS("--kbw", window.getComputedStyle(this.elm("#tab_kb")).width);
    },

    async onKeyDown(evt) {
        if (evt.target != document.body)
            return;
        let handled = true;
        let upd = true;
        switch (evt.key) {
            case "`":
                this.changeLayer(0);
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.changeLayer(parseInt(evt.key));
                break;
            case "q":
                await this.setSize(1);
                break;
            case "w":
                await this.setSize(2);
                break;
            case "e":
                await this.setSize(3);
                break;
            case "r":
                await this.setSize(4);
                break;
            case "a":
            case "k":
                await this.changeView("k");
                break;
            case "s":
            case "l":
                await this.changeView("l");
                break;
            case "d":
            case "j":
                this.setFlag("view", "j");
                upd = false;
                break;
            case "Tab":
                await this.toggleHint();
                break;
            case "p":
                this.toggleFlag("ui", "single");
                upd = false;
                break;
            case "m":
                this.toggleKBType();
                break;
            default:
                handled = false;
        }
        if (handled) {
            evt.stopPropagation();
            evt.preventDefault();
            if (upd)
                this.update();
        }
    },

    async onClick(evt, elm) {
        let upd = true;
        elm.blur();
        switch (elm.id) {
            case "btn_ui_tab":
                this.setFlag('ui', 'tab');
                upd = false;
                break;
            case "btn_ui_single":
                this.setFlag('ui', 'single');
                upd = false;
                break;
            case "tabbtn_kb":
                await this.changeView("k");
                break;
            case "tabbtn_list":
                await this.changeView("l");
                break;
            case "tabbtn_json":
                this.setFlag("view", "j");
                upd = false;
                break;
            case "btn_l_clr":
                await this.clearLayer();
                break;
            case "btn_shorten":
                await this.changeSize(-1);
                break;
            case "btn_expand":
                await this.changeSize(+1);
                break;
            case "btn_hint":
                await this.toggleHint();
                break;
            case "btn_layout":
                await this.toggleKBType();
                break;
            case "btn_setting":
                await this.setting();
                this.Keyboard.build();
                break;
            case "btn_clr":
                await this.clear();
                break;
            case "btn_del":
                await this.delete();
                break;
            case "btn_saveas":
            case "btn_imp2":
                await this.import2();
                break;
            case "btn_imp":
                await this.import();
                break;
            default:
                upd = false;
                console.log("Unhandled click-event. Elm: ", elm);
        }
        evt.preventDefault();
        evt.stopPropagation();
        if (upd)
            this.update();
    },

    async init() {
        Keymap.init();
        document.body.onkeydown = async (evt) => { await this.onKeyDown(evt); };
        this.elm("#prof_name").onmouseenter = async (evt) => { await this.showProfileList(); }
        this.elm("#comment").onchange = async (evt) => { Keymap.setMapping("#comment", this.elm("#comment").value); await this.save(); this.update(); }

        this.Keyboard.init();

        await this.loadFirstProf();
        this.update();

        for (const elm of this.elms(".BIND-CLICK")) {
            elm.onclick = async (evt) => { await this.onClick(evt, elm); };
        }
    },

    async loadFirstProf() {
        let l = await _PROFILE_.all();
        if (l.length > 0) {
            l.sort((a, b) => a.localeCompare(b, "zh"));
            await Keymap.load(l[0]);
        } else {
            // Keymap.init();
            Keymap.loadHelp();
        }
        this.Keyboard.build();
    },

    async showProfileList() {
        function hideList() {
            for (const e of document.querySelectorAll(".prof_list")) {
                e.remove();
            }
        }
        function genProf(prof, add_cls, onclick) {
            let elm = document.createElement("DIV");
            elm.classList.add("prof_name");
            if (add_cls) elm.classList.add(...add_cls);
            if (onclick) elm.onclick = onclick;
            elm.innerHTML = prof;
            elm.title = prof;
            return elm;
        }

        hideList();

        let s = [];
        let l = await _PROFILE_.all();
        if (l.length > 0) {
            l.sort((a, b) => a.localeCompare(b, "zh"));
            for (const p of l) {
                s.push(genProf(p, null, async () => {hideList(); await this.load(p); this.update();}));
            }
        }
        let elm_new = genProf(NEW_KEYMAP, ["prof_cmd"], async () => {hideList(); await this.new(); this.update();});
        s.push(elm_new);
        s.push(genProf(KeymapHelp["#NAME"], ["prof_cmd"], async () => {hideList(); Keymap.loadHelp(); this.Keyboard.build(); this.update();}));
        let temp = document.createElement("span");
        temp.innerHTML = `<div class="prof_list" style="position:absolute;box-shadow: 0px 3px 6px #000;opacity: 0;"></div>`;
        let elm_list = temp.children[0];
        elm_list.append(...s);
        elm_list.onmouseleave = hideList;
        let elm_prof = this.elm("#prof_name");
        document.body.appendChild(elm_list);
        elm_list.style.left = elm_prof.offsetLeft - 5;
        elm_list.style.top = elm_prof.offsetTop - 5; // - elm_new.offsetHeight - 5;
        elm_list.style.opacity = 1;
    },

    // Data Operation Methods
    async new() {
        let name = await get_name_dlg();
        if (name) {
            Keymap.init(name);
            await Keymap.save();
        }
    },

    async save(force = true) {
        if (!Keymap.Name) {
            if (!force) return;
            Keymap.Name = await get_name_dlg();
        }
        if (!Keymap.Name) return;
        await Keymap.save();
    },

    async load(name) {
        if (!await Keymap.load(name)) {
            alert("无法载入键谱：" + name);
            await this.loadFirstProf();
        }
        this.Keyboard.build();
    },

    async delete() {
        await Keymap.del();
        await this.loadFirstProf();
    },

    async import() {
        let json_ = this.Json.Value;
        if (!json_)
            return;
        if (Keymap.loadJSON(json_)) {
            await this.save();
        }
    },

    async import2() {
        let json_ = this.Json.Value;
        if (!json_)
            return;
        let name = await get_name_dlg();
        if (name) {
            Keymap.init();
            if (!Keymap.loadJSON(json_))
                return;
            Keymap.Name = name;
            await this.save();
        }
    },

    async clear() {
        Keymap.clear();
        await this.save(false);
    },

    async clearLayer() {
        Keymap.clearLayer();
        await this.save(false);
    },

    // UI Operation Methods

    async changeView(view) {
        if (view == "k" || view == "l") {
            Keymap.Config.view = view;
            await this.save(false);
        }
    },

    changeLayer(ln) {
        if (ln < 0 || ln > Keymap.Config.layers) return;
        Keymap.CurLayer = ln;
    },

    async changeSize(delta) {
        Keymap.Config.kbsize = Util.between(Keymap.Config.kbsize + delta, 1, 4);
        await this.save(false);
    },

    async setSize(s) {
        Keymap.Config.kbsize = Util.between(s, 1, 4);
        await this.save(false);
    },

    async toggleHint() {
        Keymap.Config.kbhint = !Keymap.Config.kbhint;
        await this.save(false);
    },

    async setHint(b) {
        Keymap.Config.kbhint = Boolean(b);
        await this.save(false);
    },

    async toggleKBType() {
        Keymap.Config.layout = (Keymap.Config.layout == "mac") ? "pc" : "mac";
        await this.save(false);
    },

    async setting() {
        await setting_dlg();
        await this.save();
    },

    // Keymapping Methods
    async setMapping(mk) {
        let s = await setmapping_dlg(mk);
        if (s != null) {
            if (s.length > 0) {
                Keymap.setMapping(...s);
            } else {
                for (const kn in Keymap.getAllMappings(mk)) {
                    Keymap.setMapping(kn, "");
                }
            }
            await this.save();
            this.update();
        }
    },
}

UI.Keyboard = {
    _inited: false,
    Elm: UI.elm("#keyboard"),
    ElmExt: UI.elm("kb_ext"),

    get Ks() {
        return this.Elm.querySelectorAll("k");
    },

    showTip(elm_k) {
        if (!elm_k.classList.contains("set")) return;
        this.clearTips();
        let s = [];
        let l = Keymap.getAllMappings(elm_k.dataset.k);
        for (const kn in l) {
            s.push(`${Util.gen_combo_kn_elm(kn, elm_k.dataset.k)}<km>${l[kn]}</km>`);
        }
        let temp = document.createElement("span");
        temp.innerHTML = `<div class="kms_info">${s.join("")}</div>`;
        let elm_tip = temp.children[0];
        let std_kw = this.Ks[0].offsetWidth; // first key button ("Esc") width as standard
        // let std_kh = this.Ks[0].offsetHeight;
        elm_tip.style.minWidth = "var(--kw)";
        elm_tip.style.minHeight = "var(--kh)";
        this.Elm.appendChild(elm_tip);
        if (elm_k.offsetLeft > this.Elm.offsetWidth - std_kw - elm_tip.offsetWidth)
            elm_tip.style.left = elm_k.offsetLeft - elm_tip.offsetWidth;
        else
            elm_tip.style.left = elm_k.offsetLeft + std_kw;
        if (elm_k.offsetTop > this.Elm.offsetHeight - elm_tip.offsetHeight) {
            elm_tip.style.top = this.Elm.offsetHeight - elm_tip.offsetHeight;
        } else {
            elm_tip.style.top = elm_k.offsetTop;
        }
        if (elm_tip.offsetTop < 2) {
            elm_tip.style.top = 2;
            elm_tip.style.maxHeight = this.Elm.offsetHeight - 4;
        }
        if (elm_tip.offsetLeft < 2) {
            elm_tip.style.left = 2;
            elm_tip.style.maxWidth = this.Elm.offsetWidth - 4;
        }
        elm_tip.style.opacity = 1;
    },

    clearTips() {
        for (const e of document.querySelectorAll(".kms_info")) {
            e.remove();
        }
    },

    _genElmK(kn) {
        return `<div class="ktn">${kn}</div><div class="ktr">${kn}</div><div class="ktm"></div>`;
    },

    init() {
        if (this._inited) return;
        this._inited = true;
        for (const elm of this.Ks) {
            // let mk = elm.innerHTML;
            // if (mk in KEY_TABLE) {
            //     elm.dataset.k = mk;
            //     // k = KEY_TABLE[mk];
            //     // // k.push(elm);
            //     // elm.innerHTML = this._genElmK(k[0] || mk);
            //     elm.innerHTML = this._genElmK(KEY_TABLE[mk] || mk);
            // } else {
            //     elm.classList.add("dis");
            // }
            elm.dataset.k = elm.innerHTML;
        }
        this.build();
    },

    build() {
        // add extkeys
        let s = [];
        for (const k of Keymap.Config.extkeys) {
            if (k == "/") {
                s.push(`<span style="width:100%;"></span>`);
            } else if (k[0] == "#") {
                s.push(`<d class="d1 f-end">${k.substring(1)}&nbsp;</d>`);
            } else {
                s.push(`<k data-k="${k}">${this._genElmK(k)}</k>`);
            }
        }
        this.ElmExt.innerHTML = s.join("");
        for (const elm of this.Ks) {
            if (elm.dataset.k in Keymap.KeyTable) {
                elm.classList.remove("dis");
                elm.innerHTML = this._genElmK(Keymap.KeyTable[elm.dataset.k] || elm.dataset.k);
                elm.onmouseenter = (evt) => { this.showTip(elm) };
                elm.onmouseleave = (evt) => { this.clearTips() };
                elm.onclick = (evt) => { UI.setMapping(elm.dataset.k); };
            } else {
                elm.classList.add("dis");
            }
        }
    },

    // reset() {
    //     for (const elm_k of this.Ks) {
    //         elm_k.title = "";
    //         elm_k.querySelector(".ktr").innerHTML = Keymap.KeyTable[elm_k.dataset.k][0] || elm_k.dataset.k;
    //         elm_k.querySelector(".ktm").innerHTML = "";
    //         elm_k.classList.remove("set");
    //     }
    // },

    updateK(elm_k) {
        let mk = elm_k.dataset.k;
        if (!mk || !(mk in Keymap.KeyTable)) {
            console.log(mk);
            return;
        }
        let elm_ktr = elm_k.querySelector(".ktr");
        // elm_ktr.innerHTML = Keymap.KeyTable[mk][0] || mk;
        elm_ktr.innerHTML = Keymap.KeyTable[mk] || mk;
        let elm_ktm = elm_k.querySelector(".ktm");
        elm_ktm.innerHTML = "";
        let ks = Keymap.getAllMappings(mk);
        if (Util.is_empty_obj(ks)) {
            elm_k.classList.remove("set");
            elm_k.title = "";
        } else {
            elm_k.classList.add("set");
            for (const k in ks) {
                let ktm = ks[k];
                if (ktm.startsWith("* ")) {
                    elm_ktr.innerHTML = (k != mk) ? k : mk;
                    elm_ktm.innerHTML = ktm.split('\n')[0].substr(2);
                }
            }
        }
    },

    update() {
        for (const elm_k of this.Ks) {
            this.updateK(elm_k);
        }
        UI.elm("#comment").value = Keymap.getMapping("#comment");
    },
};

UI.List = {
    Elm: UI.elm("#list"),

    update() {
        let s = [];
        for (const mk in Keymap.KeyTable) {
            let l = Keymap.getAllMappings(mk);
            for (const kn in l) {
                s.push(`${Util.gen_combo_kn_elm(kn)}<km data-mainkey="${mk}" class="kinfo">${l[kn]}</km>`);
            }
        }
        this.Elm.innerHTML = s.join('\n');
    },
};

UI.Json = {
    Elm: UI.elm("#json"),

    get Value() {
        return this.Elm.value;
    },

    update() {
        this.Elm.value = Keymap.JSON;
    },
};

async function get_name_dlg() {
    return new Promise((resolver) => {
        let html = `<dialog class="name_dlg">
            <div style="font-weight: bold">请输入键谱名：</div>
            <div><input type="text" id="name" size="50" autofocus /></div>
            <div style="text-align: right;">
                <button class="btn btnok">确定</button>
                <button class="btn btncancel">取消</button>
            </div>
            </dialog>`;
        let tmp = document.createElement("div");
        tmp.innerHTML = html;
        let dlg = tmp.children[0];
        let elm_name = dlg.querySelector("#name");
        function _ok() {
            let name = elm_name.value;
            if (!name) {
                alert("不能为空！");
                elm_name.focus();
                return;
            }
            if (name.search(/[\*\?\\\/\:\"\<\>\|]/) >= 0) {
                alert(`名字中不能包含 \* \? \\ \/ \: \" \< \> \|`);
                elm_name.focus();
                return;
            }
            dlg.remove();
            resolver(name.trim());
        }
        function _cancel() {
            dlg.remove();
            resolver();
        }
        dlg.querySelector(".btnok").onclick = _ok;
        elm_name.onkeydown = (evt) => {
            if (evt.key == "Enter") {
                evt.preventDefault();
                evt.stopPropagation();
                _ok();
                return;
            }
        }
        dlg.querySelector(".btncancel").onclick = _cancel;
        dlg.onclose = _cancel;
        document.body.appendChild(dlg);
        dlg.showModal();
    });
};

async function setmapping_dlg(mk) {
    return new Promise((resolver) => {
        let s = [];
        if (!Keymap.isModKey(mk)) {
            for (const k of Keymap.ModKeys) {
                s.push(`<label><kn class="ck"><input type="checkbox" value="${k}">${k}</kn></label>`)
            }
        }
        let html = `<dialog class="kmdlg">
            <div style="flex: 1;display: flex;gap: 5px;">
                <div style="display: flex;flex-flow:column;gap: 10px;">
                    <kn>${mk}</kn>
                    <!--<div style="display:grid;grid-template-columns:max-content max-content;gap: 10px;width:fit-content;">-->
                        <div style="display:grid;grid-auto-flow:column;grid-template-rows:repeat(5, max-content);gap: 10px;width:fit-content;">
                        ${s.join("")}
                    </div>
                </div>
                <textarea id="mapping" style="flex: 1;border-width:1px;" autofocus>${Keymap.getMapping(mk) || ""}</textarea>
            </div>
            <div>
            映射信息以"* "（星号+空格）开头的组合键定义为主映射，在“键帽提示”模式下会在键帽上显示第一行文字，并且主映射的组合键会直接显示在键帽上。
            </div>
            <div style="text-align: right;">
                <button class="btn btnclr danger" style="float:left;">清空本键所有映射信息</button>
                <button class="btn btnok">确定</button>
                <button class="btn btncancel">取消</button>
            </div>
            </dialog>`;
        let tmp = document.createElement("div");
        tmp.innerHTML = html;
        let dlg = tmp.children[0];
        dlg.querySelectorAll('input[type="checkbox"]').forEach(elm => {
            elm.onclick = (evt) => {
                let kn = "";
                for (const elm of dlg.querySelectorAll('input[type="checkbox"]:checked')) {
                    kn += elm.value + "+";
                }
                kn += mk;
                let inf = Keymap.getMapping(kn);
                let m = dlg.querySelector("#mapping");
                m.value = inf || "";
                m.focus();
            }
        });
        dlg.querySelector(".btnok").onclick = (evt) => {
            let kn = "";
            for (const elm of dlg.querySelectorAll('input[type="checkbox"]:checked')) {
                kn += elm.value + "+";
            }
            kn += mk;
            let inf = dlg.querySelector("#mapping").value;
            dlg.remove();
            resolver([kn, inf]);
        };
        dlg.querySelector(".btnclr").onclick = (evt) => {
            dlg.remove();
            resolver([]);
        };
        dlg.querySelector(".btncancel").onclick = (evt) => {
            dlg.remove();
            resolver();
        };
        dlg.onclose = (evt) => {
            dlg.remove();
            resolver();
        }
        document.body.appendChild(dlg);
        dlg.showModal();
    });
}

async function setting_dlg() {
    return new Promise((resolver) => {
        let cfg = Keymap.Config;
        let html = `<dialog class="stdlg">
            <div class="sts">
                <div class="subttl">键帽配色</div>
                <span>默认字符</span><input type="text" id="c3" style="width: 6rem;" />
                <span>默认背景</span><input type="text" id="c4" style="width: 6rem;" />
                <span>高亮字符</span><input type="text" id="c0" style="width: 6rem;" />
                <span>高亮背景</span><input type="text" id="c1" style="width: 6rem;" />
                <span>高亮边框</span><input type="text" id="c2" style="width: 6rem;" />
                <div class="subttl">普通模式</div>
                <span>键宽</span><input type="number" id="kw1" min="0.1" max="10" step="0.1" style="width: 3rem;" />
                <span>键高</span><input type="number" id="kh1" min="0.1" max="10" step="0.1" style="width: 3rem;" />
                <span>字母大小</span><input type="number" id="ks1" min="0.1" max="10" step="0.1" style="width: 3rem;" />
                <div class="subttl">键帽提示模式</div>
                <span>键宽</span><input type="number" id="kw2" min="0.1" max="10" step="0.1" style="width: 3rem;" />
                <span>键高</span><input type="number" id="kh2" min="0.1" max="10" step="0.1" style="width: 3rem;" />
                <span>字母大小</span><input type="number" id="ks2" min="0.1" max="10" step="0.1" style="width: 3rem;" />
                <span>提示大小</span><input type="number" id="kt2" min="0.1" max="10" step="0.1" style="width: 3rem;" />
                <div class="subttl"></div>
                <span>键盘层数</span><input type="number" id="layers" min="1" step="1" style="width: 3rem;" />
                <span>键表列数</span><input type="number" id="cols" min="1" max="10" step="1" style="width: 3rem;" />
                <span>自定义扩展键</span><input type="text" id="extkeys" style="grid-column: 2 / -1" />
                <span>自定义修饰键</span><input type="text" id="modkeys" style="grid-column: 2 / -1" />
                </div>
            <div style="text-align: right;">
                <button class="btn btnclr danger" style="float:left;">Reset UI</button>
                <button class="btn btnok">确定</button>
                <button class="btn btncancel">取消</button>
            </div>
            </dialog>`;
        let tmp = document.createElement("div");
        tmp.innerHTML = html;
        let dlg = tmp.children[0];
        for (const c of dlg.querySelectorAll("input")) {
            if (c.id == "extkeys") {
                c.value = cfg.extkeys.join(", ");
            } else if (c.id == "modkeys") {
                c.value = cfg.modkeys.join(", ");
            } else {
                c.value = cfg[c.id];
            }
        }
        dlg.querySelector(".btnok").onclick = (evt) => {
            for (const c of dlg.querySelectorAll("input")) {
                if (c.id == "extkeys") {
                    cfg.extkeys = c.value.trim().split(/\s*,\s*/);
                    UI.update();
                } else if (c.id == "modkeys") {
                    cfg.modkeys = c.value.trim().split(/\s*,\s*/);
                } else {
                    cfg[c.id] = c.value;
                }
            }
            dlg.remove();
            resolver(true);
        };
        dlg.querySelector(".btnclr").onclick = (evt) => {
            Util.copy_obj(Keymap.Config, Keymap._default_cfg);
            dlg.remove();
            resolver(true);
        };
        dlg.querySelector(".btncancel").onclick = (evt) => {
            dlg.remove();
            resolver();
        };
        dlg.onclose = (evt) => {
            dlg.remove();
            resolver();
        }
        document.body.appendChild(dlg);
        dlg.showModal();
    })
};

// IO layer: browser storage
var _PROFILE_ = {
    async read(prof) {
        if (prof)
            return localStorage.getItem(prof + ".keymap") || "";
        else {
            console.warn("Error! Empty profile name.");
            return "";
        }
    },
    async write(prof, data) {
        if (prof)
            localStorage.setItem(prof + ".keymap", data);
        else
            console.warn("Error! Empty profile name.");
    },
    async del(prof){
        if (prof)
            localStorage.removeItem(prof + ".keymap");
        else
            console.warn("Error! Empty profile name.");
    },
    async all() {
        let s = [];
        for (const k in localStorage) {
            if (k.endsWith(".keymap")) {
                s.push(k.slice(0, -7));
            }
        }
        return s;
    },
};

// If run by webwin, enable local-file profiles.
window.on_webwin_loaded = async () => {
    // IO layer: webwin fs
    window._PROFILE_ = {
        _data_fdr: "keymaps",

        _datafile(prof) { return this._data_fdr + "\\" + prof + ".keymap"; },

        async read(prof) {
            try {
                return await webwin.fs.readfile(this._datafile(prof), "utf-8");
            } catch (e) {
                console.log(e);
                return "";
            }
        },
        async write(prof, data) {
            try {
                await webwin.fs.writefile(this._datafile(prof), data, "w", "utf-8");
            } catch (e) {
                console.log(e);
            }
        },
        async del(prof) {
            try {
                await webwin.fs.removefile(this._datafile(prof));
            } catch (e) {
                console.log(e);
            }
        },
        async all() {
            try {
                let s = [];
                (await webwin.fs.ls(this._data_fdr, "*.keymap", "file")).forEach(p => {
                    s.push(p.name.slice(0, -7));
                });
                return s;
            } catch (e) {
                console.log(e);
                return [];
            }
        },
    }
    __loader__ = " 【精装礼盒版 *^____^* 】";
    await __init__();
};

var __appname__ = "键谱";
var __version__ = "2.1.0-beta";
var __homepage__ = "https://github.com/cataerogong/keymap";
var __loader__ = "";

async function __init__() {
    document.title = `${__appname__}`;
    document.querySelector(".about").innerHTML = `${__appname__} v${__version__} ${__loader__} Copyright &COPY; 2023 CataeroGong [<a href="${__homepage__}">Project Home</a>]`;
    await UI.init();
}

__init__();
