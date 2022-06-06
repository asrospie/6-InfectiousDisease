import React from 'react';
import Simulation from '../Simulation';
import Grid from './Grid';
import legendImage from './legend2.png'

const legendStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    width: "18vw",
    // margin: "auto",
    backgroundColor: "#A9BFCF",
    overflowX: "auto",
    overflowY: "auto",
    borderRadius: "10px",
    marginLeft: "1vw",
    marginRight: "1vw",
    marginTop: "5px",
};

const daysStyle = {
    backgroundColor: "#A9BFCF",
    width: "18vw",
    height: "16vh",
    borderRadius: "10px",
    marginLeft: "1vw",
    marginRight: "1vw",
    marginBottom: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};

const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};

const Legend = ({counter, len}) => {
    return (
        <div style={container}>
            <div style={daysStyle}>
                <h2>Simulation Length</h2>
                <h3>{Math.floor(counter / 24)} / {len} Days</h3>
                <h3>{counter % 24} / {23} Hours</h3>
            </div>
            <div style={legendStyle}>
                <img src={legendImage} alt="" width="275" height="140"/> 
            </div>
        </div>
    );

};
export default Legend;

