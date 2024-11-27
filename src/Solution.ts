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

    taskThree(){
        let ids = this.#guestData.map(x => x.guestId);
        let numberOfIds = 0;
        let peopleWhoDidntExplore = 0;
        for (let i = 0; i < this.#guestData.length; i += numberOfIds) {
            numberOfIds = 1;
            for (let j = i + 1; j < this.#guestData.length; j++) {
                if(ids[i] == ids[j])
                {
                    numberOfIds++;
                }
            }
            if (numberOfIds <= 4) {
                peopleWhoDidntExplore++;
            }
            
        }

        return `3. feladat\nA fürdőben ${peopleWhoDidntExplore} vendég járt csak egy részlegen.`;
    }
}