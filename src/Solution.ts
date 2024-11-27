import fs from "fs";
import GuestActivity from "./GuestActivity";

export default class Solution {
    #guestData: GuestActivity[] = [];

    constructor(source: string) {
        fs.readFileSync(source)
            .toString()
            .split("\n")
            .forEach(line => {
                this.#guestData.push(new GuestActivity(line));
            });
    }


    taskTwo(){
        return `2.feladat\nAz első vendég ${this.#guestData[0].when.toString().split(' ')[4]}-kor lépett ki az öltözőből.\nAz utolsó vendég ${this.#guestData[this.#guestData.length - 1].when.toString().split(' ')[4]}-kor lépett ki az öltözőből.`
    }


}