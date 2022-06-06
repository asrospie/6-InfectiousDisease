import { GridTile } from './GridTile.mjs'

export class Item extends GridTile {
    id;
    viralAmount;
    contaminated;
    canSpread;
    contaminationPeroid = 10;
    lifetime = 10;

    constructor(id, viralAmount, contaminated, canSpread, contaminationPeroid, x, y) {
        super(x, y);
        this.id = id;
        this.viralAmount = viralAmount;
        this.contaminated = contaminated;
        this.contaminationPeroid = contaminationPeroid;
        this.canSpread = canSpread;
        this.hours_since_contamination = 0;
    }

    incrementHour() {
        if(!this.contaminated && this.viralAmount > 0) {
            this.contaminated = true;
            this.hours_since_contamination = 0;
        }
        if(this.contaminated) {
            this.hours_since_contamination++;
            console.log("Item has been contaminated for " + this.hours_since_contamination + " ticks");
            console.log("Old viral amount is " + this.viralAmount);
            this.viralAmount = this.viralAmount * Math.pow(0.5, this.hours_since_contamination/this.lifetime);
            console.log("New viral amount is " + this.viralAmount);
            if(this.hours_since_contamination >= this.contaminationPeroid * 24 || this.viralAmount < 1) {
                this.contaminated = false;
                this.hours_since_contamination = 0;
                this.viralAmount = 0;
            }
        }
    }

    //TODO: Ask about this? if still contaminated, should the time just reset
    infect(viralAmount) {
        this.viralAmount += viralAmount;
        console.log("Item has been infected with  " + viralAmount + "; new viral amount is " + this.viralAmount);
        if(viralAmount > 0) {
            this.hours_since_contamination = 0;
        }
    }


    setViralAmount(viralAmount) {
        this.viralAmount = viralAmount;
    }

    getViralAmount() {
        return this.viralAmount;
    }

    setContaminated(contaminated) {
        this.contaminated = contaminated;
    }

    getContaminated() {
        return this.contaminated;
    }

    setCanSpread(canSpread) {
        this.canSpread = canSpread;
    }

    getCanSpread() {
        return this.canSpread;
    }

    getId() {
        return this.id;
    }

    clone() {
        let item = new Item(this.id, this.viralAmount, this.contaminated, this.canSpread, this.x, this.y);
        item.hours_since_contamination = this.hours_since_contamination;
        return item;
    }

    contact(other) {
    }
}