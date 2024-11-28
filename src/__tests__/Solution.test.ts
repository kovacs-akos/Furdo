import Solution from '../Solution';

describe("Solution class", () => {
    const instance: Solution = new Solution("furdoadat.txt");
    instance.taskTwo();
    it("Should return the correct answer for taskTwo", () => {
        expect(instance.taskTwo()).toBe("2.feladat\nAz első vendég 06:14:56-kor lépett ki az öltözőből.\nAz utolsó vendég 22:59:56-kor lépett ki az öltözőből.");
    });
});
