﻿import fs from "fs"; // https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; // https://nodejs.org/docs/latest-v14.x/api/url.html
import Solution from "./Solution";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
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
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->
    const sol: Solution = new Solution("furdoadat.txt");

    


    
    res.write(`2.feladat: ${sol.taskTwo()}\n`);
    res.write(`3.feladat: ${sol.taskThree()}\n`);
    res.write(`4.feladat: ${sol.taskFour()}\n`);
    res.write(`5.feladat: ${sol.furdoTimeStatistics()}\n`);
    res.write(`7. feladat\n${sol.furdoDepartmentStatistics()}\n`);
    sol.writeSaunaTimeToFile("szauna.txt");




    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
