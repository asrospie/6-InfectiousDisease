import React, { useState, useEffect, useRef } from 'react';
import Grid from './components/Grid';
import ControlGroup from './components/ControlGroup';
import Legend from './components/Legend';
import { Simulation as Sim } from '../../classes/Simulation';
import { Air } from '../../classes/Air';
import { Person } from '../../classes/Person';
import { Item } from '../../classes/Item';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// DEFAULT VALUES
// const VIRAL_PRODUCTION = 1.1;
const VIRAL_PRODUCTION = true; // true is low false is high
const SIMULATION_LENGTH = 25;
const MASKS = false;
const SANITIZED = false;
const DEATH = false;
const VIRAL_THRESHOLD = 10E5;
const CONTAGIOUS_PERIOD = 10;
const CONTAMINATED_PERIOD = 2;
const WIDTH = 5;
const HEIGHT = 5;
const HOURS_PER_DAY = 24;

const useForceUpdate = () => {
    const [ f, setF ] = useState(0);
    return () => setF(old => old + 1);
};

const Simulation = ({match, reset}) => {
    const [ sim, setSim ] = useState(new Sim(
        VIRAL_PRODUCTION,
        SIMULATION_LENGTH,
        MASKS,
        SANITIZED,
        DEATH,
        VIRAL_THRESHOLD,
        CONTAGIOUS_PERIOD,
        CONTAMINATED_PERIOD,
        WIDTH,
        HEIGHT
    ));
    const forceUpdate = useForceUpdate();

    const [ running, setRunning ] = useState(false);
    const [ speed, setSpeed ] = useState(1);
    const [ repeat, setRepeat ] = useState(null);
    const [ finalized, setFinalized ] = useState(false);
    const [ started, setStarted ] = useState(false);
    const [ resetBool, setResetBool ] = useState(false);

    // used for timing an©d simulation ticks
    const [ counter, setCounter ] = useState(0);

    // data passed to the results page
    const [ data, setData ] = useState([]);

    // used for routing
    const history = useHistory();

    function updateSim({
        height=sim.height,
        width=sim.width,
        simulationLength=sim.simulationLength,
        canDie=sim.canDie,
        contagiousPeriod=sim.contagiousPeriod,
        contaminatedPeriod=sim.contaminatedPeriod,
        viralProduction=sim.viralProduction,
        viralThreshold=sim.viralThreshold,
        peopleMasked=sim.peopleMasked,
        itemsSanitized=sim.itemsSanitized,
    }) {
        let h = (height <= 0) ? 1 : height;
        let w = (width <= 0) ? 1 : width;
        let temp = sim.grid;
        sim.rebuild({
            height: h,
            width: w,
            simulationLength: simulationLength,                
            canDie: canDie,
            contagiousPeriod: contagiousPeriod,
            contaminatedPeriod: contaminatedPeriod,
            viralProduction: viralProduction,
            viralThreshold: viralThreshold,
            peopleMasked: peopleMasked,
            itemsSanitized: itemsSanitized,
            simulationLength: simulationLength
        });

        // copy previous grid into new one
        let minHeight = (sim.grid[0].length > temp[0].length) ? temp[0].length : sim.grid[0].length; 
        let minWidth = (sim.grid.length > temp.length) ? temp.length : sim.grid.length;

        for (let i = 0; i < minHeight; i++) {
            for (let j = 0; j < minWidth; j++) {
                sim.grid[j][i] = temp[j][i];
            }
        }

        setSim(sim);
        forceUpdate();
        console.log(sim);
    }

    useEffect(() => {
        if (resetBool) {
            clearTimeout(repeat);
            setSim(null);
            forceUpdate();
            reset();
        }
    }, [resetBool]);
    
    // Called when simulation starts and stops
    useEffect(() => {
        if (running) {
            clearTimeout(repeat);
            runSim(speed);
        } else {
            clearTimeout(repeat);
        }
    }, [running, speed]);

    useEffect(() => {
        // Stop simulation when sim length has been reached
        if (Math.floor(counter / HOURS_PER_DAY) >= sim.simulationLength) {
            toggleRunning(false);
            setFinalized(true);
        }  
        if (counter % HOURS_PER_DAY === 0 && running) {
            let newData = data;
            let vironCount = 0;
            let infected = 0;
            let contaminated = 0;

            sim.grid.forEach((row, i) => {
                row.forEach((obj, j) => {
                    vironCount += parseInt(obj.viralAmount);
                    if (obj.viralAmount > 0) {
                        if (obj instanceof Item) {
                            contaminated++;
                        } else if (obj instanceof Person) {
                            infected++;
                        }
                    }
                });
            });
            let tag = counter / HOURS_PER_DAY;
            newData.push({
                name: `${tag}`,
                virons: vironCount,
                infections: infected,
                contaminations: contaminated,
            })
            setData(newData);
            console.log(data);
        }
    }, [repeat, running]);

    function toggleRunning(status) {
        setRunning(status);
    }

    function runSim(speedMult) {
        setCounter(val => {
            return val + 1;
        });

        setSim(sim.simulationTick());
        forceUpdate();

        // Timout for speed
        setRepeat(setTimeout(() => runSim(speedMult), speedMult * 1000));
    }

    function updateGrid(x, y, tile, viron_count) {
        let temp;
        if (tile === 'air') {
            temp = new Air(x, y);

            temp.setViralAmount(viron_count);
        } else if (tile === 'person') {
            temp = new Person(null, x, y);
            temp.setViralAmount(viron_count);
            // temp.viralThreshold = sim.viralThreshold;
        } else {
            let cont = viron_count > 0;
            let canSpread = viron_count > sim.viralThreshold;
            let contPeriod = sim.contaminatedPeriod;
            temp = new Item(null, viron_count, cont, canSpread, contPeriod, x, y);
        }
        sim.grid[y][x] = temp;
        setSim(sim);
        forceUpdate();
    }

    function updateStarted(val) {
        setStarted(val);
    }

    function updateSpeed(val) {
        setSpeed(val);
    }

    function resetSim() {
        setResetBool(true);
    }

    function backToHome() {
        setResetBool(true);
        history.push('/');
    }

    return (
        <div style={styling}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
            }}>
                <Button style={{
                    width: "8rem",
                    height: "2rem",
                    margin: "auto",
                    padding: "0px",
                }} onClick={backToHome}>Back to Home</Button>
                <div></div>
                <h1 style={{marginTop: "5px", color: "white"}}>Simulation</h1>
                <div></div>
                <div></div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Grid 
                    running={running} 
                    sim={sim}
                    updateGrid={updateGrid}
                    started={started}
                    speed={speed}
                    updateSpeed={updateSpeed}
                />
                <Legend counter={counter} len={sim.simulationLength} />
            </div>
            <ControlGroup 
                sim={sim}
                updateSim={updateSim}
                toggleRunning={toggleRunning}
                running={running}
                finalized={finalized}
                reset={() => resetSim()}
                started={started}
                updateStarted={updateStarted}
                data={data}
            />
        </div>
    );
};

export default Simulation;

const styling = {
    textAlign: "center",
    position: "fixed",
    left: "50%",
    transform: "translate(-50%)",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#466C80",
};