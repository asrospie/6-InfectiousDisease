import { GridTile } from './GridTile.mjs'

export class Air extends GridTile {
    viralAmount;

    constructor(x, y) {
        super(x, y);
        this.viralAmount = 0;
    }

    incrementDay() {
        if(this.contaminated) {
            // Point 8 in the simulation rules
            this.viralAmount /= 2;
            this.days_since_contamination++;
            if(this.days_since_contamination >= 5) {
                this.contaminated = false;
                this.days_since_contamination = 0;
            }
        }
    }

    setViralAmount(viralAmount) {
        this.viralAmount = viralAmount;
    }

    getViralAmount() {
        return this.viralAmount;
    }

    clone() {
        let air = new Air(this.x, this.y);
        air.setViralAmount(this.viralAmount);
        return air;
    }
}