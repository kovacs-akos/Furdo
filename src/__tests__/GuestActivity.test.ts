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
    expect(guestActivity.inOrOut).toBe(false);
});


});

