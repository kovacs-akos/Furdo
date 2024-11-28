import Solution from '../Solution';

describe("Solution class", () => {
    const instance: Solution = new Solution("furdoadat.txt");
    instance.taskTwo();
    it("Should return the correct answer for taskTwo", () => {
        expect(instance.taskTwo()).toBe("2.feladat\nAz első vendég 06:14:56-kor lépett ki az öltözőből.\nAz utolsó vendég 19:56:22-kor lépett ki az öltözőből.");
    });

    it("Should return the correct answer for taskThree", () => {
        expect(instance.taskThree()).toBe("3. feladat\nA fürdőben 33 vendég járt csak egy részlegen.");
    });

    it("Should return the correct answer for taskFour", () => {
        expect(instance.taskFour()).toBe("4. feladat \nA legtöbb időt eltöltő vendég:\n306. vendég 6:32:9");
    });

    it("Should return the correct answer for taskFive", () => {
        expect(instance.taskFive()).toBe("Fürdőben voltak 6-9 között: 9 vendég\nFürdőben voltak 9-16 között: 30 vendég\nFürdőben voltak 16-20 között: 61 vendég");

    });

    it("Should return the correct answer for taskSeven", () => {
        expect(instance.taskSeven()).toBe("Uszodában volt: 41 vendég\nSzaunában volt: 52 vendég\nGyógyvízben volt: 54 vendég\nStrandon volt: 48 vendég");
    });

});
