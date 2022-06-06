import { Button, Container, Row } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

const styling = {
    textAlign: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};


const About = () => {
    return (
        <div style = {styling}>
            <h1>About</h1>
               <p>
                   This website will simulate the spread of infectious disease through the use of a grid similar to Conway's Game of Life.
                   <hr/>
                   Players will be able to toy with and change parameters in order to learn the impact they have on the spread of disease.
                   <hr/> 
                   This application is developed by Quaranteam - Cellular Automaton Infectious Disease
             </p>
             <br />
             <Link to="/landing">
                <Button>Back to Landing</Button>
            </Link>
        </div>
    );
};

export default About;