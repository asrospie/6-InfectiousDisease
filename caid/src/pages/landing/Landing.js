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

const padding = {
    margin: "5px",
};

const Landing = () => {
    return (
        <div style={styling}>
            <h1>Cellular Automata</h1>
            <h4>Infectious Disease Simulation</h4>
            <hr />
            <Link to="/simulation">
                <Button>Go to Simulation</Button>
            </Link>  
            <br />
            <Container>
                <Row className="justify-content-md-center">
                    <Link to="/about">
                        <Button style={padding}>About</Button>
                    </Link>
                    <Link to="/tutorial">
                        <Button style={padding}>Tutorial</Button>
                    </Link>
                </Row>
            </Container>
        </div>
    );
};

export default Landing;