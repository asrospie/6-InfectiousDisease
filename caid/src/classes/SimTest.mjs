import { Simulation } from './Simulation.mjs'

let viralProduction = 0;
let simulationLength = 15 * 24;
let peopleMasked = false;
let itemsSanitized = false;
let canDie = false;
let viralThreshold = 5;
let contagiousPeriod = 5;
let contaminatedPeriod = 5;

let width = 10
let height = 10

let sim = new Simulation(viralProduction, simulationLength, peopleMasked, itemsSanitized, canDie, viralThreshold, contagiousPeriod, contaminatedPeriod, width, height);

// Create a sick person at (2,2) and a healthy one at (3,2)
sim.addPerson(0, 5, 2, 2);
sim.addPerson(1, 0, 3, 2);

let people = [ sim.grid[2][2], sim.grid[2][3] ];

console.log("The grid: ");
console.log(sim.grid);


for(let i = 0; i < 5; i++) {
    console.log("Starting tick " + i);

    sim.simulationTick();

    console.log("Simulation tick complete");

    people.forEach(person => console.log("Person " + person.id + " is at location (" + person.getX() + ", " + person.getY() + ") and has viral amount " + person.getViralAmount()));    

}