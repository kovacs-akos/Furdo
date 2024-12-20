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
        return `2. feladat\nAz első vendég ${this.#guestData[0].when.toString().split(' ')[4]}-kor lépett ki az öltözőből.\nAz utolsó vendég ${this.#guestData[this.#guestData.length - 1].when.toString().split(' ')[4]}-kor lépett ki az öltözőből.`
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

                return `4. feladat \nA legtöbb időt eltöltő vendég:\n${maxGuestId}. vendég ${hours}:${minutes}:${seconds}`;
            }
    } 


    taskFive() {
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
        return `5. feladat\nFürdőben voltak 6-9 között: ${sixToNine} vendég\nFürdőben voltak 9-16 között: ${nineToFour} vendég\nFürdőben voltak 16-20 között: ${fourToEight} vendég`;
    }



    calculateSaunaTime() {
        const saunaLog: Map<number, Array<{ start: Date, end?: Date }>> = new Map();
        const saunaTime: Map<number, number> = new Map();

        this.#guestData.forEach(guest => {
            if (guest.sectionId === 2) { 
                if (!saunaLog.has(guest.guestId)) {
                    saunaLog.set(guest.guestId, []);
                }
                const logs = saunaLog.get(guest.guestId)!;
                if (logs.length > 0 && !logs[logs.length - 1].end) {
                    logs[logs.length - 1].end = guest.when;
                } else {
                    logs.push({ start: guest.when });
                }
            }
        });

        saunaLog.forEach((logs, guestId) => {
            let totalTime = 0;
            logs.forEach(log => {
                if (log.end) {
                    totalTime += (log.end.getTime() - log.start.getTime()) / 1000;
                }
            });
            saunaTime.set(guestId, totalTime);
        });

        return saunaTime;
    }

    taskSix(fileName: string) {
        const saunaTime = this.calculateSaunaTime();
        const lines: string[] = [];

        saunaTime.forEach((time, guestId) => {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = Math.floor(time % 60);
            lines.push(`${guestId} ${hours}:${minutes}:${seconds}`);
        });

        fs.writeFileSync(fileName, lines.join("\n"));
    }


    taskSeven() {
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
        return `7. feladat\nUszodában volt: ${uszoda.size} vendég\nSzaunában volt: ${szauna.size} vendég\nGyógyvízben volt: ${gyogyviz.size} vendég\nStrandon volt: ${strand.size} vendég`;
    }




    


}
