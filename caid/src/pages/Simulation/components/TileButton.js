import React from 'react';
import '../../../styles/tile_button.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function sciNotation(number) {

    if(number >= 10E5) {
        return number.toExponential(4);
    } else {
        return Math.round(number);
    }
}

const TileButton = ({tile, viralAmount, onClick, disabled, threshold}) => {
    let tileCSS;
    if (tile === 'air') {
        tileCSS = 'air';
    } else if (tile === 'person') {
        tileCSS = 'person';
    } else {
        tileCSS = 'item';
    }

    let infectedCSS;
    if (viralAmount >= threshold && tile === 'person') {
        infectedCSS = 'contagious';
    } else if (viralAmount > 0) {
        infectedCSS = 'infected';
    } else {
        infectedCSS = 'clean';
    }

    const cssClass = `${tileCSS} ${infectedCSS}`;

    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip>Viral Amount: {sciNotation(viralAmount)}</Tooltip>
            }
        >
            {/* <button className={cssClass} style={buttonStyle} onClick={onClick} disabled={disabled}></button> */}
            <button className={cssClass} style={buttonStyle} onClick={onClick}></button>
        </OverlayTrigger>
    );
};

export default TileButton;

const buttonStyle = {
    border: ".5px solid black",
    width: "2em",
    height: "2em",
};