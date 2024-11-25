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

    furdoDepartmentStatistics() {
        let uszoda = new Set<number>();
        let szauna = new Set<number>();
        let gyogyviz = new Set<number>();
        let strand = new Set<number>();
        this.#guestData.forEach(guest => {
            if (guest.sectionId === 1) {
                if (guest.inOrOut) {
                    uszoda.add(guest.guestId);
                }
            } else if (guest.sectionId === 2) {
                if (guest.inOrOut) {
                    szauna.add(guest.guestId);
                }
            } else if (guest.sectionId === 3) {
                if (guest.inOrOut) {
                    gyogyviz.add(guest.guestId);
                }
            } else if (guest.sectionId === 4) {
                if (guest.inOrOut) {
                    strand.add(guest.guestId);
                }
            }
        });
        return `Uszodában volt: ${uszoda.size} vendég\nSzaunában volt: ${szauna.size} vendég\nGyógyvízben volt: ${gyogyviz.size} vendég\nStrandon volt: ${strand.size} vendég`;
    }
}
