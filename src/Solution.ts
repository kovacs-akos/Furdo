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

    writeSaunaTimeToFile(fileName: string) {
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
}
