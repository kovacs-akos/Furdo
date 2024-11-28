import GuestActivity from "../GuestActivity";

const content = require("../Content");
const {taskTwo, taskThree } = require("../Solution");

describe("Guestactivity class", () => {
    let guestActivity: GuestActivity;
    beforeEach(() => {
        guestActivity = new GuestActivity("112 0 1 6 14 56");
    });


it("should return the correct guestId", () => {
    expect(guestActivity.guestId).toBe(112);
});

it("should return the correct sectionId", () => {
    expect(guestActivity.sectionId).toBe(0);
});

it("should have the correct inOrOut value", () => {
    expect(guestActivity.inOrOut).toBe(true);
});

it("should have the correct when value", () => {
    expect(guestActivity.when).toEqual(new Date("2023-10-01T06:14:56Z"));
});

});




// test("taskTwo function", () => {
//     const mockGuestData = [
//         { when: new Date("2023-10-01T08:00:00Z") },
//         { when: new Date("2023-10-01T18:00:00Z") }
//     ];
//     const instance = {
//         guestData: mockGuestData,
//         taskTwo
//     };
//     const result = instance.taskTwo();
//     expect(result).toBe("2.feladat\nAz első vendég 08:00:00-kor lépett ki az öltözőből.\nAz utolsó vendég 18:00:00-kor lépett ki az öltözőből.");
// });

// test("taskThree function", () => {
//     const 

// });
