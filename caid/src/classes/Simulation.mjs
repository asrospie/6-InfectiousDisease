import { Person } from './Person.mjs';
import { Air } from './Air.mjs';
import { Item } from './Item.mjs';

export class Simulation {
    // people;
    // items;
    grid;

    width;
    height;

    viralProduction;
    simulationLength;
    peopleMasked;
    itemsSanitized;
    canDie;
    viralThreshold;
    contagiousPeriod;
    contaminatedPeriod;

    constructor(viralProduction, simulationLength, peopleMasked, itemsSanitized, canDie, viralThreshold, contagiousPeriod, contaminatedPeriod, width, height) {
        this.date = Date.now();
        // this.people = [];
        // this.items = [];

        this.width = width;
        this.height = height;

        this.grid = new Array(height);
        for (let i = 0; i < height; i++) {
            this.grid[i] = new Array(width);
            for (let j = 0; j < width; j++) {
                this.grid[i][j] = new Air(j, i);
            }
        }

        // console.log("The Grid:");
        // console.log(this.grid);

        this.currentDays = 0;
        this.currentHour = 0;

        this.viralProduction = viralProduction;
        this.simulationLength = simulationLength;
        this.peopleMasked = peopleMasked;
        this.itemsSanitized = itemsSanitized;
        this.canDie = canDie;
        this.viralThreshold = viralThreshold;
        this.contagiousPeriod = contagiousPeriod;
        this.contaminatedPeriod = contaminatedPeriod;
    }

    rebuild({
        viralProduction=this.viralProduction,
        simulationLength=this.simulationLength,
        peopleMasked=this.peopleMasked,
        itemsSanitized=this.itemsSanitized,
        canDie=this.canDie,
        viralThreshold=this.viralThreshold,
        contagiousPeriod=this.contagiousPeriod,
        contaminatedPeriod=this.contaminatedPeriod,
        width=this.width,
        height=this.height
    }) {
        this.date = Date.now();
        // this.people = [];
        // this.items = [];

        this.width = width;
        this.height = height;

        this.grid = new Array(height);
        for (let i = 0; i < height; i++) {
            this.grid[i] = new Array(width);
            for (let j = 0; j < width; j++) {
                this.grid[i][j] = new Air(j, i);
            }
        }

        // console.log("The Grid:");
        // console.log(this.grid);

        this.currentDays = 0;
        this.currentHour = 0;

        this.viralProduction = viralProduction;
        this.simulationLength = simulationLength;
        this.peopleMasked = peopleMasked;
        this.itemsSanitized = itemsSanitized;
        this.canDie = canDie;
        this.viralThreshold = viralThreshold;
        this.contagiousPeriod = contagiousPeriod;
        this.contaminatedPeriod = contaminatedPeriod;
    }

    // Add the person both to the list of people and the grid
    addPerson(id, viralAmount, x, y) {
        // let old_cell = this.grid[y][x];
        let person = new Person(id, x, y);
        person.setSickDays(this.contagiousPeriod);
        person.setViralAmount(viralAmount);
        person.setContagious(true); // TODO: Should this be true? How should this flag work.
        // this.people.push(person);

        // console.log("We have person.getY() = " + person.getY());

        this.grid[person.getY()][person.getX()] = person;

        // if(old_cell instanceof Person) {
        //     this.people.splice(this.people.indexOf(old_cell));
        // } else if(old_cell instanceof Item) {
        //     this.items.splice(this.items.indexOf(old_cell));
        // }

        // console.log(this.grid[person.getY()][person.getX()]);
    }

    // Add the item to the list of items and also the grid.
    addItem(id, x, y) {
        // let old_cell = this.grid[y][x];

        let item = new Item(id, 0, false, true, this.contaminatedPeriod, x, y)
        // this.items.push(item);
        this.grid[item.getY()][item.getX()] = item;

        // if(old_cell instanceof Person) {
        //     this.people.splice(this.people.indexOf(old_cell));
        // } else if(old_cell instanceof Item) {
        //     this.items.splice(this.items.indexOf(old_cell));
        // }

    }

    simulationTick() {
        if(this.currentHour === 0) {
            console.log("Initializing simulation. this.contaminatedPeriod = " + this.contaminatedPeriod);
            // Init the things that need to be initted.
            for(let i = 0; i < this.height; i++) {
                for(let j = 0; j < this.width; j++) {
                    let tmp = this.grid[i][j];
                    if(tmp instanceof Person) {
                        tmp.viralProduction = this.viralProduction;
                        tmp.viralThreshold = this.viralThreshold;
                        tmp.infectedPeroid = this.contagiousPeriod;
                    } else if(tmp instanceof Item) {
                        tmp.contaminatedPeriod = this.contaminatedPeriod * 24;
                    }
                }
            }
        }

        // Handle one tick of the simulation
        this.currentHour++;
        if (this.currentHour % 24 === 0) {
            this.currentDay++;
        }
        let people = [];
        // Make copies of all the data so we don't modify them while making the new tick's grid
        // I could not find a builtin function to deep copy a 2d array of objects. Feel free to replace this with a better method if one exists
        let last_tick = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            last_tick[i] = new Array(this.width);
            for (let j = 0; j < this.width; j++) {
                // console.log("Cloning object at grid[" + i + "][" + j + "]");
                if(this.grid[i][j] instanceof Person) {
                    people.push(this.grid[i][j]);
                }
                last_tick[i][j] = this.grid[i][j].clone();
            }
        }

        // Calculate what should happen to each tile of the grid
        people.forEach(p => {
                // Point 4: Contact people and items that share a border
                if (p.getY() - 1 >= 0 && !(last_tick[p.getY() - 1][p.getX()] instanceof Air)) { // Up
                    p.contact(this.grid[p.getY() - 1][p.getX()]);
                }
                if (p.getY() + 1 < this.height && !(last_tick[p.getY() + 1][p.getX()] instanceof Air)) { // Down
                    p.contact(this.grid[p.getY() + 1][p.getX()]);
                }
                if (p.getX() - 1 >= 0 && !(last_tick[p.getY()][p.getX() - 1] instanceof Air)) { // Left
                    p.contact(this.grid[p.getY()][p.getX() - 1]);
                }
                if (p.getX() + 1 < this.width && !(last_tick[p.getY()][p.getX() + 1] instanceof Air)) { // Right
                    p.contact(this.grid[p.getY()][p.getX() + 1]);
                }

                // TODO: infect all the air around the player according to the model
                // Probably will be the most computationally expensive step. will have nested loops per person
        });

        // Move People
        people.forEach(person => { // Still have to use last tick so people don't get moved a bunch in one tick.
            const NOTHING = 0, UP = 1, DOWN = 2, LEFT = 3, RIGHT = 4;
            let decision = Math.floor(Math.random() * 5);
            let x = person.getX();
            let y = person.getY();
            let new_x = x;
            let new_y = y;
            switch (decision) {
                case UP:
                    // console.log("Decided to move UP");
                    new_y = y - 1;
                    if(new_y < 0) {
                        new_y = 0;
                    }
                    break;
                case DOWN:
                    // console.log("Decided to move DOWN");
                    new_y = y + 1;
                    if(new_y >= this.height) {
                        new_y = this.height-1;
                    }
                    break;
                case LEFT:
                    // console.log("Decided to move LEFT");
                    new_x = x - 1;
                    if(new_x < 0) {
                        new_x = 0;
                    }
                    break;
                case RIGHT:
                    // console.log("Decided to move RIGHT");
                    new_x = x + 1;
                    if(new_x >= this.width) {
                        new_x = this.width-1;
                    }
                    break;
                case NOTHING:
                    // console.log("Decided to stay still");
                    break;
                default:
                    // console.log("This should never print");
                    break;
            }
            // Attempt to move in chosen direction
            if (this.grid[new_y][new_x] instanceof Air) {
                let tmp = this.grid[new_y][new_x];
                this.grid[new_y][new_x] = person;
                this.grid[y][x] = tmp;
                person.setX(new_x);
                person.setY(new_y)
                // console.log("Moved to (" + person.getX() + ", " + person.getY() + ")");
            } else {
                // console.log("Couldn't move, space was occupied");
            }
        });

        // Cut the contamination in half for each item if a new day
        //TODO: Replace with updated models when we recieve them
        // if (this.currentHour % 24 === 0) {
        //     this.items.forEach(item => item.incrementDay());
        // }

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.grid[i][j] instanceof Person || this.grid[i][j] instanceof Item) {
                    this.grid[i][j].incrementHour();
                }
            }
        }


        // Draw the grid to the page
        return this;
    }
}

