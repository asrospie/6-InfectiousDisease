import React from 'react';
import {
    Button,
} from 'react-bootstrap';

const SpeedMult = ({speed, updateSpeed}) => {
    return (
        <div style={container}>
            <div style={titleBlock}>
                <h3>Speed Multiplier</h3>
            </div>
            <div style={inputGroup}>
                <Button 
                    variant={ speed === 1 ? 'primary' : 'light' }
                    onClick={ () => {
                        updateSpeed(1);
                    } }
                >1x</Button>
                <Button 
                    variant={ speed === .5 ? 'primary' : 'light' }
                    onClick={ () => {
                        updateSpeed(.5);
                    } }
                >2x</Button>
                <Button 
                    variant={ speed === .25 ? 'primary' : 'light' }
                    onClick={ () => {
                        updateSpeed(.25);
                    } }
                >4x</Button>
                <Button 
                    variant={ speed === .125 ? 'primary' : 'light' }
                    onClick={ () => {
                        updateSpeed(.125);
                    } }
                >8x</Button>
                <Button 
                    variant={ speed === .0625 ? 'primary' : 'light' }
                    onClick={ () => {
                        updateSpeed(.0625);
                    } }
                >16x</Button>
                <Button 
                    variant={ speed === .03125 ? 'primary' : 'light' }
                    onClick={ () => {
                        updateSpeed(.03125);
                    } }
                >32x</Button>
            </div>
        </div>
    );
};

export default SpeedMult;

const inputGroup = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 4rem)",
    marginTop: "30px",
    gridGap: "1rem",
};

const titleBlock = {
};

const container = {
    width: "18vw",
    height: "30vh",
    margin: "auto",
    marginLeft: "1vw",
    marginRight: "1vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9BFCF",
    borderRadius: "10px",
};