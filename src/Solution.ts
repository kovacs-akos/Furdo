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

    furdoTimeStatistics() {
        let sixToNine = 0;
        let nineToFour = 0;
        let fourToEight = 0;
        this.#guestData.forEach(guest => {
            if (guest.when.getHours() >= 6 && guest.when.getHours() < 9 && guest.inOrOut && guest.sectionId === 0) {
                sixToNine++;
            } else if (guest.when.getHours() >= 9 && guest.when.getHours() < 16 && guest.inOrOut && guest.sectionId === 0) {
                nineToFour++;
            } else if (guest.when.getHours() >= 16 && guest.when.getHours() < 20 && guest.inOrOut && guest.sectionId === 0) {
                fourToEight++;
            }
        });
        return `Fürdőben voltak 6-9 között: ${sixToNine} vendég\nFürdőben voltak 9-16 között: ${nineToFour} vendég\nFürdőben voltak 16-20 között: ${fourToEight} vendég`;
    }


    


}