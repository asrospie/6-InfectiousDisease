import { GridTile } from './GridTile.mjs'
import { Item } from './Item.mjs'

export class Person extends GridTile {
    viralAmount; 
    dead = false;
    viralThreshold = 10E5; //TODO: Set this from front end.
    contagious = false;
    sickHours = 0;
    immune = false;
    infectedPeroid = 10;
    hourlyProduction = 0;
    lowProduction = false;
    highLowProductionAmount = 10E7;
    highHighProductionAmount = 10E11;
    lowLowProductionAmount = 10E5;
    lowHighProductionAmount = 10E9;

    constructor(id, x, y) {
        super(x,y);
        this.id = id;
    }

    setViralAmount(viralAmount) {
        this.viralAmount = viralAmount;
    }

    setViralThreshold(viralThreshold) {
        this.viralThreshold = viralThreshold;
    }

    getViralAmount() {
        return this.viralAmount;
    }

    kill() {
        this.dead = true;
    }

    isDead() {
        return this.dead;
    }

    setContagious(contagious) {
        this.contagious = contagious;
    }

    isContagious() {
        return this.contagious;
    }

    setSickDays(sickDays) {
        this.sickHours = sickDays;
    }

    getSickDays() {
        return this.sickHours;
    }

    clone() {
        let p = new Person(this.id, this.x, this.y);
        p.setContagious(this.contagious);
        p.setSickDays(this.sickHours);
        p.setViralAmount(this.viralAmount);
        if(this.isDead()) p.kill();
        return p;
    }

    infect(viralAmount) {
        this.viralAmount += viralAmount;
    }

    contact(other) {
        console.log("Person is contacting a thing at " + other.x + ", " + other.y);
        if(this.contagious) {
            let vironsToGive = this.hourlyProduction * 0.005;
            other.infect(vironsToGive);
            this.viralAmount -= vironsToGive;
        }
        if(other instanceof Item) {
            if(other.contaminated) {
                let vironsToSteal = other.getViralAmount() * 0.005;
                this.viralAmount += vironsToSteal;
                other.viralAmount -= vironsToSteal;
            }

        }
    }

    incrementHour() {
        console.log("Person's hour is incrementing");
        console.log("Viral Amount " + this.viralAmount);
        console.log("Person is immune? " + this.immune);
        console.log("Person is contagious? " + this.contagious);
        console.log("Person is viralAmount >= viralThreshold? " + (this.viralAmount >= this.viralThreshold) + "(" + this.viralAmount + ") and (" + this.viralThreshold + ") respectively.");
        console.log("Infected period: " + this.infectedPeroid);
        console.log("Sick hours: " + this.sickHours);
        // Are they crossing the viral threshold for the first time?
        if(!this.immune && !this.contagious && this.viralAmount >= this.viralThreshold) {
            console.log("Person has crossed the viral threshold");
            this.sickHours = 0;
            this.contagious = true;
        }
        if(this.contagious) {
            console.log("Person is contagious");
            this.sickHours++;

            if(this.sickHours >= this.infectedPeroid * 24) {
                //Good news! You're cured! Or dead. TODO: Add death
                this.contagious = false;
                this.immune = true;
                this.sickHours = 0;
            } else if(this.sickHours < 0.2 * 24 * this.infectedPeroid || this.sickHours > 0.6 * 24 * this.infectedPeroid) { 
                // The first 20% and the last 40% are low production peroids
                console.log("Using low production value");
                if(this.lowProduction) {
                    this.hourlyProduction = this.lowLowProductionAmount / 24;
                } else {
                    this.hourlyProduction = this.highLowProductionAmount / 24;
                }
            } else { // High production days
                console.log("Using high production value");
                if(this.lowProduction) {
                    this.hourlyProduction = this.lowHighProductionAmount / 24;
                } else {
                    this.hourlyProduction = this.highHighProductionAmount / 24;
                }
            }

            this.viralAmount += this.hourlyProduction;
        }

        if(this.immune) {
            this.viralAmount = 0;
        }

    }

}

