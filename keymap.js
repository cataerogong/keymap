let KeyTable = {
    "0": [48, ''], "1": [49, ''], "2": [50, ''], "3": [51, ''], "4": [52, ''], "5": [53, ''], "6": [54, ''], "7": [55, ''], "8": [56, ''], "9": [57, ''],
    "A": [65, ''], "B": [66, ''], "C": [67, ''], "D": [68, ''], "E": [69, ''], "F": [70, ''], "G": [71, ''], "H": [72, ''], "I": [73, ''], "J": [74, ''],
    "K": [75, ''], "L": [76, ''], "M": [77, ''], "N": [78, ''], "O": [79, ''], "P": [80, ''], "Q": [81, ''], "R": [82, ''], "S": [83, ''], "T": [84, ''],
    "U": [85, ''], "V": [86, ''], "W": [87, ''], "X": [88, ''], "Y": [89, ''], "Z": [90, ''],
    ";": [186, ''], "=": [187, ''], ",": [188, ''], "-": [189, ''], ".": [190, ''], "/": [191, ''], "`": [192, ''], "[": [219, ''], "\\": [220, ''], "]": [221, ''], "'": [222, ''],
    "F1": [112, ''], "F2": [113, ''], "F3": [114, ''], "F4": [115, ''], "F5": [116, ''], "F6": [117, ''], "F7": [118, ''], "F8": [119, ''], "F9": [120, ''], "F10": [121, ''],
    "F11": [122, ''], "F12": [123, ''], "F13": [0, ''], "F14": [0, ''], "F15": [0, ''], "F16": [0, ''], "F17": [0, ''], "F18": [0, ''], "F19": [0, ''], "F20": [0, ''],
    "F21": [0, ''], "F22": [0, ''], "F23": [0, ''], "F24": [0, ''], "F25": [0, ''], "F26": [0, ''], "F27": [0, ''], "F28": [0, ''], "F29": [0, ''], "F30": [0, ''],
    "Alt": [18, ''], "RAlt": [0, ''], "Backspace": [8, ''], "Caps": [20, ''], "Ctrl": [17, ''], "RCtrl": [0, ''], "Del": [46, ''], "Down": [40, '↓'], "End": [35, ''], "Enter": [13, ''], "REnter": [0, ''], "Esc": [27, ''],
    "Home": [36, ''], "Ins": [45, ''], "Left": [37, '←'], "Menu": [93, ''], "Pause": [19, ''], "PgDn": [34, ''], "PgUp": [33, ''], "PrtScr": [-1, ''], "Right": [39, '→'],
    "ScrLck": [145, ''], "Shift": [16, ''], "RShift": [0, ''], "Space": [32, ''], "Tab": [9, ''], "Up": [38, '↑'], "Win": [91, ''],
    "NumLck": [144, ''], "Num-": [109, '-'], "Num*": [106, '*'], "Num.": [110, '.'], "Num/": [111, '/'], "Num+": [107, '+'],
    "Num0": [96, '0'], "Num1": [97, '1'], "Num2": [98, '2'], "Num3": [99, '3'], "Num4": [100, '4'], "Num5": [101, '5'], "Num6": [102, '6'], "Num7": [103, '7'], "Num8": [104, '8'], "Num9": [105, '9'],
    "LB": [0, ''], "RB": [0, ''], "MB": [0, ''], "WhlUp": [0, ''], "WhlDn": [0, ''], 
};
const COMBO_KEY = ["Alt", "RAlt", "Ctrl", "RCtrl", "Shift", "RShift", "Win"];
const DEFAULT_PROF = "DEFAULT";

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

    fill_obj(dst, src) {
        for (const k in src)  if (!(k in dst)) dst[k] = src[k];
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

var Keymap = {
    Name: "",
    _data: null,

    _default_cfg: {
        "view": "kb",
        "layer": 0,
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
    },

    get _default_keymap() {
        return JSON.parse(`{"#0": {}, "#1": {}, "#2": {}, "#3": {}, "#4": {}, "#config": ${JSON.stringify(this._default_cfg)}}`);
    },

    init(name = "") {
        this.Name = name;
        this._data = this._default_keymap;
    },

    fixStruct(kmap) {
        // check config
        if (!("#config" in kmap))
            kmap["#config"] = {};
        Util.fill_obj(kmap["#config"], this._default_cfg);
        // check layers
        for (let i=0; i<=4; i++) {
            if (!(("#"+i) in kmap))
            kmap["#"+i] = {};
        }
        // migrate data v1 to v2
        for (const k in kmap) {
            if (!k.startsWith("#")) {
                kmap["#0"][k] = kmap[k];
                delete kmap[k];
            } else if (k.startsWith("#layer-")) {
                let ln = k.slice(7);
                Object.assign(kmap["#"+ln], kmap[k]);
                delete kmap[k];
            }
        }
    },

    loadJSON(json_str) {
        if (!json_str)
            return false;
        let temp = null;
        try {
            temp = JSON.parse(json_str);
            this.fixStruct(temp);
        } catch (e) {
            console.log(e);
            return false;
        }
        this._data = temp;
        return true;
    },

    get JSON() {
        return JSON.stringify(this._data, null, 2);
    },

    get Config() {
        return this._data["#config"];
    },

    Layer(ln = null) {
        if (ln == null)
            ln = this.Config.layer;
        return this._data["#"+ln];
    },

    getMapping(kn, ln = null) {
        return (kn in this.Layer(ln)) ? this.Layer(ln)[kn] : null;
    },

    getAllMappings(mk, ln = null) {
        let ret = {};
        for (const kn in this.Layer(ln)) {
            if (Util.get_mainkey(kn) == mk) {
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
        this.Name = name || this.Name;
        if (!this.Name) {
            return false;
        }
        let json_ = await _PROFILE_.read(this.Name);
        return Boolean(json_ && this.loadJSON(json_));
    },
    async save() {
        if (!this.Name) return;
        await _PROFILE_.write(this.Name, this.JSON);
    },
    async del() {
        if (!this.Name) return;
        await _PROFILE_.del(this.Name);
        this.init();
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
        console.log("UI.update()");
        this.Keyboard.update();
        this.List.update();
        this.Json.update();

        let cfg = Keymap.Config;
        cfg.kbsize = Util.between(cfg.kbsize, 1, 4);
        this.setFlag("view", cfg.view);
        this.setFlag('layer', cfg.layer);
        this.setFlag("kbsize", cfg.kbsize);
        this.setFlag("kbhint", cfg.kbhint);
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
        this.resize();
    },

    resize() {
        this.setCSS("--kbw", window.getComputedStyle(this.elm("#tab_kb")).width);
    },

    async init() {
        this.elm("#profs").onchange = async (evt) => { await this.load(evt.target.value); this.update(); };
        this.elm("#btn_new").onclick = async (evt) => { await this.new(); this.update(); };
        this.elm("#tabbtn_kb").onclick = async (evt) => { await this.changeView("kb"); this.update(); };
        this.elm("#tabbtn_list").onclick = async (evt) => { await this.changeView("list"); this.update(); };
        this.elm("#tabbtn_json").onclick = (evt) => { this.setFlag("view", "json"); };
        for (let i=0; i<=4; i++) {
            this.elm("#btn_l"+i).onclick = async (evt) => { await this.changeLayer(i); this.update(); };
        }
        this.elm("#btn_l_clr").onclick = async (evt) => { await this.clearLayer(); this.update(); };
        this.elm("#btn_shorten").onclick = async (evt) => { await this.changeSize(-1); this.update(); };
        this.elm("#btn_expand").onclick = async (evt) => { await this.changeSize(+1); this.update(); };
        this.elm("#btn_hint").onclick = async (evt) => { await this.toggleHint(); this.update(); };
        this.elm("#btn_setting").onclick = async (evt) => { await this.setting(); this.update(); };
        this.elm("#btn_clr").onclick = async (evt) => { await this.clear(); this.update(); };
        this.elm("#btn_del").onclick = async (evt) => { await this.delete(); this.update(); };
        this.elm("#btn_saveas").onclick = async (evt) => { await this.import2(); this.update(); };
        this.elm("#btn_imp").onclick = async (evt) => { await this.import(); this.update(); };
        this.elm("#btn_imp2").onclick = async (evt) => { await this.import2(); this.update(); };

        Keymap.init();
        this.Keyboard.init();

        await this.listProfiles();
        // await this.load();
        this.update();
    },

    async listProfiles() {
        let elm_profs = this.elm("#profs");
        elm_profs.innerHTML = "";
        let profs = await _PROFILE_.all();
        if (profs.length > 0) {
            profs.sort();
            if (!profs.includes(Keymap.Name)) {
                await Keymap.load(profs[0]);
            }
            profs.forEach(p => {
                let elm = document.createElement("option");
                elm.value = p;
                elm.innerText = p;
                if (p == Keymap.Name) elm.selected = true;
                elm_profs.appendChild(elm);
            });
        } else {
            Keymap.init();
        }
    },

    // Data Operation Methods
    async new() {
        let name = await get_name_dlg();
        if (name) {
            Keymap.init(name);
            await Keymap.save();
            await this.listProfiles();
        }
    },

    async save(force = true) {
        let n = false;
        if (!Keymap.Name) {
            if (!force) return;
            Keymap.Name = await get_name_dlg();
            n = true;
        }
        if (!Keymap.Name) return;
        await Keymap.save();
        if (n)
            await this.listProfiles();
    },

    async load(name) {
        await Keymap.load(name);
    },

    async delete() {
        await Keymap.del();
        await this.listProfiles();
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
            if (!Keymap.loadJSON(json_))
                return;
            Keymap.Name = name;
            await this.save();
            await this.listProfiles();
        }
    },

    async clear() {
        Keymap.init(Keymap.Name);
        await this.save(false);
    },

    async clearLayer() {
        for (const mk in KeyTable) {
            let l = Keymap.getAllMappings(mk);
            for (const kn in l)
                delete Keymap.Layer()[kn];
        }
        await this.save(false);
    },

    // UI Operation Methods

    async changeView(view) {
        if (["kb", "list"].includes(view)) {
            Keymap.Config.view = view;
            await this.save(false);
        }
    },

    async changeLayer(ln) {
        if (ln < 0 || ln > 4) return;
        Keymap.Config.layer = ln;
        await this.save(false);
    },

    async changeSize(delta) {
        Keymap.Config.kbsize = Util.between(Keymap.Config.kbsize + delta, 1, 4);
        await this.save(false);
    },

    async toggleHint() {
        Keymap.Config.kbhint = !Keymap.Config.kbhint;
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
            if (s != []) {
                Keymap.setMapping(...s);
            } else {
                for (const kn in Keymap.getAllMappings(mk)) {
                    Keymap.setMapping(kn, "");
                }
            }
            await this.save();
            this.update();
        }
    }
}

UI.Keyboard = {
    Elm: UI.elm("#keyboard"),

    get Ks() {
        return this.Elm.querySelectorAll("k");
    },

    showTip(elm_k) {
        if (!elm_k.classList.contains("set")) return;
        this.clearTips();
        let s = [];
        let l = Keymap.getAllMappings(elm_k.keyName);
        for (const kn in l) {
            s.push(`${Util.gen_combo_kn_elm(kn, elm_k.keyName)}<km>${l[kn]}</km>`);
        }
        let temp = document.createElement("span");
        temp.innerHTML = `<div class="kms_info" style="position:absolute;box-shadow: 0px 0px 10px #000;opacity: 0;">${s.join("")}</div>`;
        let elm_tip = temp.children[0];
        let std_kw = this.Ks[0].offsetWidth; // first key button ("Esc") width as standard
        let std_kh = this.Ks[0].offsetHeight;
        elm_tip.style.minWidth = std_kw;
        elm_tip.style.minHeight =std_kh;
        this.Elm.appendChild(elm_tip);
        if (elm_k.offsetLeft > this.Elm.offsetWidth - std_kw - elm_tip.offsetWidth)
            elm_tip.style.left = elm_k.offsetLeft - elm_tip.offsetWidth;
        else
            elm_tip.style.left = elm_k.offsetLeft + std_kw;
        if (elm_k.offsetTop > this.Elm.offsetHeight - elm_tip.offsetHeight)
            elm_tip.style.top = this.Elm.offsetHeight - elm_tip.offsetHeight;
        else
            elm_tip.style.top = elm_k.offsetTop;
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

    init() {
        for (const elm of this.Ks) {
            let mk = elm.innerHTML;
            if (mk in KeyTable) {
                k = KeyTable[mk];
                elm.innerHTML = `<div class="ktn">${k[1] || mk}</div><div class="ktr">${k[1] || mk}</div><div class="ktm"></div>`;
                elm.keyName = mk;
                elm.onmouseenter = (evt) => { this.showTip(elm) };
                elm.onmouseleave = (evt) => { this.clearTips() };
                elm.onclick = (evt) => { UI.setMapping(mk); };
                k.push(elm);
            } else {
                elm.classList.add("dis");
            }
        }
    },

    reset() {
        for (const elm_k of this.Ks) {
            elm_k.title = "";
            elm_k.querySelector(".ktr").innerHTML = KeyTable[elm_k.keyName][1] || elm_k.keyName;
            elm_k.querySelector(".ktm").innerHTML = "";
            elm_k.classList.remove("set");
        }
    },

    updateK(elm_k) {
        let mk = elm_k.keyName;
        let elm_ktr = elm_k.querySelector(".ktr");
        elm_ktr.innerHTML = KeyTable[mk][1] || mk;
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
    },
};

UI.List = {
    Elm: UI.elm("#list"),

    update() {
        let cfg = Keymap.Config;
        let s = [];
        for (const mk in KeyTable) {
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
            <div><input id="name" size="50" autofocus /></div>
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
            dlg.remove();
            resolver(name);
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

let COMBO_CHK_LIST = "";
for (const c of COMBO_KEY) COMBO_CHK_LIST += `<label><kn class="ck"><input type="checkbox" value="${c}">${c}</kn></label>`;

async function setmapping_dlg(mk) {
    return new Promise((resolver) => {
        let html = `<dialog class="kmdlg">
            <div style="flex: 1;display: flex;gap: 5px;">
                <div style="display: flex;flex-flow:column;gap: 10px;">
                    <kn>${mk}</kn>
                    <div style="display:grid;grid-template-columns:max-content max-content;gap: 10px;width:fit-content;">
                        ${COMBO_KEY.includes(mk) ? "" : COMBO_CHK_LIST}
                    </div>
                </div>
                <textarea id="mapping" style="flex: 1;" autofocus>${Keymap.Layer()[mk] || ""}</textarea>
            </div>
            <div>映射信息以"* "（星号+空格）开头的组合键定义为主映射，在“键帽提示”模式下会在键帽上显示第一行文字。并且主映射的组合键会直接显示在键帽上。</div>
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
        let dcfg = Keymap._default_cfg;
        let cfg = Keymap.Config;
        let html = `<dialog class="stdlg">
            <div class="sts">
                <div class="subttl">颜色</div>
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
            c.value = cfg[c.id] || dcfg[c.id];
        }
        dlg.querySelector(".btnok").onclick = (evt) => {
            for (const c of dlg.querySelectorAll("input")) {
                cfg[c.id] = c.value;
            }
            dlg.remove();
            resolver(true);
        };
        dlg.querySelector(".btnclr").onclick = (evt) => {
            Keymap["#config"] = Keymap._default_cfg;
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
        console.log("write():", prof)
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
        async read(prof) {
            try {
                return await webwin.fs.readfile(prof + ".keymap", "utf-8");
            } catch (e) {
                console.log(e);
                return "";
            }
        },
        async write(prof, data) {
            try {
                await webwin.fs.writefile(prof + ".keymap", data, "w", "utf-8");
            } catch (e) {
                console.log(e);
            }
        },
        async del(prof) {
            try {
                await webwin.fs.removefile(prof + ".keymap");
            } catch (e) {
                console.log(e);
            }
        },
        async all() {
            try {
                let s = [];
                (await webwin.fs.ls(".", "*.keymap", "file")).forEach(p => {
                    s.push(p.name.slice(0, -7));
                });
                return s;
            } catch (e) {
                console.log(e);
                return [];
            }
        },
    }
    __appname__ += " 【精装礼盒版 *^____^* 】";
    await __init__();
};

var __appname__ = "键谱";
var __version__ = "1.3.1";
var __homepage__ = "https://github.com/cataerogong/keymap";

async function __init__() {
    document.title = `${__appname__}`;
    document.querySelector(".about").innerHTML = `${__appname__} v${__version__} Copyright &COPY; 2023 CataeroGong [<a href="${__homepage__}">Project Home</a>]`;
    await UI.init();
}

__init__();
