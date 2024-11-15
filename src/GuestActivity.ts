export default class GuestActivity{
    protected guestId: number;
    protected sectionId: number;
    protected inOrOut: boolean;
    protected when: Date;

    /**
     *
     */
    constructor(line: string) {
        const l: string[] = line.split(" ");
        
        this.guestId = parseInt(l[0]);
        this.sectionId = parseInt(l[1]);
        if (parseInt(l[2]) == 0) this.inOrOut = true;
        else this.inOrOut =  false;
        this.when = new Date();
        this.when.setHours(parseInt(l[3]));
        this.when.setMinutes(parseInt(l[4]));
        this.when.setSeconds(parseInt(l[5]));
     
    }

}