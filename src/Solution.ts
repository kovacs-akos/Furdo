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

    taskFour() {
        const guestTimes: Record<number, number> = {}; // Store total time per guest
        const lastInTimes: Record<number, Date> = {}; // Store the last 'in' time for each guest

        // Process each guest activity
        this.#guestData.forEach(activity => {
            const guestId = activity.guestId;
            const when = activity.when;

            if (activity.inOrOut) {
                // Record the 'in' time
                lastInTimes[guestId] = when;
            } else {
                // If there's an 'out' event, calculate time spent
                if (lastInTimes[guestId]) {
                    const timeSpent = when.getTime() - lastInTimes[guestId].getTime(); // Time in milliseconds
                    guestTimes[guestId] = (guestTimes[guestId] || 0) + timeSpent;
                    delete lastInTimes[guestId]; // Clear 'in' time after processing
                }
            }
        });

        // Find the guest with the maximum time spent
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