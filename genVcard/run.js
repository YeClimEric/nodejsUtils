"use strict";

const quotePrintable = require("quoted-printable");
const utf8 = require("utf8");
const fs = require("fs-extra");

function appendFile(file, txt) {
    fs.outputFile(file, txt, {
        flag: "a+"
    }, () => {});
}

let cardModule = "BEGIN:VCARD\nVERSION:2.1\nN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:;name;;;\nFN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:fname\nTEL;CELL:mobile\nEND:VCARD\n"

function main() {
    const argv = require("minimist")(process.argv);
    let src = argv.i;
    let out = argv.o;

    if (!(src && out)) {
        console.log("Usage:node run.js -i [input file path] -o [output file path]");
        return;
    }

    let data = fs.readFileSync(src).toString();

    data.split("\n").forEach((line) => {
        let d = line.split(",");
        if (d.length !== 2) {
            return;
        }
        let name = quotePrintable.encode(utf8.encode(d[0]));
        let mobile = d[1];
        mobile = mobile.slice(0, 3) + " " + mobile.slice(3, 6) + " " + mobile.slice(6);
        appendFile(out, cardModule.replace("name", name).replace("fname", name).replace("mobile", mobile));
    });

    console.log("generate gencard successful.");
}


main();
