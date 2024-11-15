"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = content;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const url_1 = tslib_1.__importDefault(require("url"));
function content(req, res) {
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs_1.default.createReadStream("favicon.ico").pipe(res);
        return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    const params = new url_1.default.URL(req.url, `http://${req.headers.host}/`).searchParams;
    res.write("Egyszerű Hello World! (2024/2025)\n");
    res.write("<span style='color: blue;'><i>Színes és dőlt Hello World!'</i></span>\n");
    let korod = parseInt(params.get("kor"));
    if (isNaN(korod))
        korod = 18;
    res.write(`<label>Kérem a korod: <input type='text' name='kor' value=${korod} style='max-width:100px;' onChange='this.form.submit();'></label>\n`);
    res.write(`Te ${korod} éves vagy!\n`);
    res.write("</pre></form></body></html>");
    res.end();
}
//# sourceMappingURL=Content.js.map