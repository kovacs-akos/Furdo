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


    taskFour() {
        const guestTimes: Record<number, number> = {}; // Store total time per guest
        const lastInTimes: Record<number, Date> = {}; // Store the last 'in' time for each guest

        this.#guestData.forEach(activity => {
            const guestId = activity.guestId;
            const when = activity.when;

            if (activity.inOrOut) {
                // Record the 'in' time
                lastInTimes[guestId] = when;
            } else {

                if (lastInTimes[guestId]) {
                    const timeSpent = when.getTime() - lastInTimes[guestId].getTime(); // Time in milliseconds
                    guestTimes[guestId] = (guestTimes[guestId] || 0) + timeSpent;
                    delete lastInTimes[guestId]; // Clear 'in' time after processing
                }
            }
        });
            let maxTime = 0;
            let maxGuestId: number | null = null;

            for (const guestId in guestTimes) {
                if (guestTimes[guestId] > maxTime) {
                    maxTime = guestTimes[guestId];
                    maxGuestId = parseInt(guestId);
                }
            }

            // Convert milliseconds to hours, minutes, and seconds
            if (maxGuestId !== null) {
                const hours = Math.floor(maxTime / (1000 * 60 * 60));
                const minutes = Math.floor((maxTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((maxTime % (1000 * 60)) / 1000);

                return `4. feladat \nA legtöbb időt eltöltő vendég:\n${maxGuestId}vendég ${hours}:${minutes}:${seconds}`;
            }
    } 



}
