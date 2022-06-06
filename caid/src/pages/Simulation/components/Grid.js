import React, { useState, useEffect } from 'react';
import SetGridItem from './SetGridItem';
import SpeedMult from './SpeedMult';
import TileButton from './TileButton';
import { Air } from '../../../classes/Air';
import { Person } from '../../../classes/Person';
import { Item } from '../../../classes/Item';

const Grid = ({running, updateGrid, sim, started, speed, updateSpeed}) => {
    const [ showModal, setShowModal ] = useState(false);
    const [ target, setTarget ] = useState({ viralAmount: 0, tile: 'air'});

    function modalCallback(tile, viralAmount) {
        setTarget(old => {
            let obj = old;
            obj.tile = tile;
            obj.viralAmount = viralAmount;
            return obj;
        });
    }

    const innerGrid = {
        maxHeight: "100%",
        maxWidth: "100%",
    };

    function getTileType(obj) {
        if (obj instanceof Air) {
            return 'air';
        } else if (obj instanceof Person) {
            return 'person';
        } else {
            return 'item';
        }
    }

    return (
        <div style={container}>
            { started ? 
                <SpeedMult
                    speed={speed}
                    updateSpeed={updateSpeed}
                /> : 
                <SetGridItem
                    callback={modalCallback} 
                    default_viralAmount={sim.viralThreshold}
                />
            }           
            <div style={gridStyle}>
                <div style={innerGrid}>
                {
                    // temp.map((row, i) => {
                    sim.grid.map((row, i) => {
                        return (
                            <div style={rowStyle} key={i}>
                                {
                                    row.map((col, j) => {
                                        return (
                                            <div style={colStyle} key={j}>
                                                <TileButton 
                                                    threshold={sim.viralThreshold} 
                                                    disabled={running || started} 
                                                    viralAmount={col.viralAmount} 
                                                    tile={getTileType(col)} 
                                                    onClick={() => {
                                                        if (!started) {
                                                            updateGrid(col.x, col.y, target.tile, target.viralAmount);
                                                        }
                                                    }} />
                                            </div>
                                        )
                                    })
                                }
                            </div>   
                        )
                    })
                }
                </div>
                
            </div>
        </div>
    );
};

export default Grid;

const container = {
    display: "flex",
};

const buttonStyle = {
    border: ".5px solid black",
    width: "2em",
    height: "2em",
    backgroundColor: "white",
};

const rowStyle = {
    display: "flex",
    flexDirection: "row",
}

const colStyle = {
    display: "flex",
    flexDirection: "column",
}

const gridStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    width: "60vw",
    margin: "auto",
    overflowX: "auto",
    overflowY: "auto",
};