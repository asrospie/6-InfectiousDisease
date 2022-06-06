import React, { useState } from 'react';
import { 
    Modal, 
    ModalBody, 
    Button,
    Dropdown,
    Form, 
    ToggleButtonGroup,
    ToggleButton
} from 'react-bootstrap';


const setGridStyle2 = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "30vh",
    width: "18vw",
    margin: "auto",
    backgroundColor: "#A9BFCF",
    borderRadius: "10px",
    marginLeft: "1vw",
    marginRight: "1vw",
};

const SetGridItem = ({default_viralAmount, callback}) => {
    const [ tile, setTile ] = useState('air');
    const [ isInfected, setIsInfected ] = useState(false);
    const [ viralAmount, setViralAmount ] = useState(0);


    return (
        <div style={setGridStyle2}aria-labelledby="contained-modal-title-vcenter" centered>
            <div>
                <h2>Place Tile Type</h2>
            </div>
            <div style={inputContainer}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginTop: "1vw"}}>
                    <div style={form}>
                    <ToggleButtonGroup
                        name="value"
                        type="radio"
                        value={tile}
                        onChange={e => {
                            setTile(e);
                            if (e === 'air') {
                                setViralAmount(0);
                                setIsInfected(false);
                                callback('air', 0);
                            } else {
                                callback(e, viralAmount);
                            }
                        }}
                    >
                        <ToggleButton 
                            variant={tile === 'air' ? 'primary' : 'light'} 
                            value={'air'}>Air</ToggleButton>
                        <ToggleButton 
                            variant={tile === 'person' ? 'primary' : 'light'} 
                            value={'person'}>Person</ToggleButton>
                        <ToggleButton 
                            variant={tile === 'item' ? 'primary' : 'light'} 
                            value={'item'}>Item</ToggleButton>
                    </ToggleButtonGroup>
                    { tile === 'air' ? <></> : 
                        <ToggleButtonGroup
                            name="contamination"
                            type="radio"
                            value={isInfected}
                            onChange={e => {
                                let val = e;
                                setIsInfected(val);
                                val ? setViralAmount(default_viralAmount) : setViralAmount(0);
                                callback(tile, val ? default_viralAmount : 0);
                            }}                    
                        >
                            <ToggleButton 
                                variant={!isInfected ? 'primary' : 'light'} 
                                value={false}>Clean</ToggleButton>
                            <ToggleButton 
                                variant={isInfected ? 'primary' : 'light'} 
                                value={true}
                            >
                                {tile === 'person' ? 'Infected' : 'Contaminated'}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    }
                        { isInfected ? 
                            <p style={{margin: "auto"}}>Viral Amount:</p> : <></>    
                        }
                        { isInfected ? 
                            <input style={{width: "12em"}} type="number" onChange={e => {
                                setViralAmount(e.target.value); 
                                callback(tile.toLowerCase(), e.target.value);
                            }} value={viralAmount}></input> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const form = { 
    display: "grid",
    placeItems: "center",
    gridGap: "5px",
};

const inputContainer = {
    display: "grid",
    placeItems: "center",
};

export default SetGridItem;