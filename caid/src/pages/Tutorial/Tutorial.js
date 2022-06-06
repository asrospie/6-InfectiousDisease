import { Button, Container, Row } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import sim1 from './1.png'
import sim2 from './2.png'
import sim3 from './3.png'
import sim4 from './4.png'
import sim5 from './5.png'
import sim6 from './6.png'
import sim7 from './7.png'
import sim8 from './8.png'
import sim9 from './9.png'


const tutStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    overflowX: "auto",
    overflowY: "auto",
   // marginLeft: "2.5vw",
   // marginRight: "2.5vw",
    backgroundColor: "#A9BFCF",
    height: "100vh",
    width: "100vw",
};


const Tutorial = props => {
    return (
        <div style={tutStyle}>
            <h1>Tutorial</h1>
        
            <Carousel>
                <Carousel.Item interval={9999999}>
                    <img src={sim1} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h4 style={{ color: 'black'}}>Start!</h4>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}> First, enter the simulation page! This can be done by pressing the button below, 
                                                                                    or by pressing the same button located on the home page!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim2} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h4 style={{ color: 'black', margin: "0"}}></h4>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>On the right side of the page is the amount of days that have passed in the simulation, 
                                                                                    and underneath that is the legend which shows the difference between a human and object 
                                                                                    in the simulation and indicates the different levels of their infection with the virus.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim3} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h3 style={{ color: 'black'}}></h3>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>In the middle of the page is the grid. This is where the simulation takes place. To add 
                                                                                    a person, object, or air tile to the grid, click on a tile! The values selected in the 
                                                                                    selector box on the left side of the page are what determine what is being placed when you 
                                                                                    click on a tile.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim4} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h3 style={{ color: 'black'}}></h3>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>This is the selector box that we mentioned in the last slide. The first dropdown menu is 
                                                                                    how you select what you wish to add to the simulation when you click a tile on the grid. 
                                                                                    Selecting a person or item allows you to select whether or not they start infected with 
                                                                                    the virus.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim5} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h3 style={{ color: 'black'}}></h3>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>And finally, at the bottom of the page is the control panel for the simulation! 
                                                                                    This panel allows you to set parameters before running the simulation. Here is where 
                                                                                    you may change 1) the size of the grid, 2) how many days the simulation lasts, 3) the viral threshold 
                                                                                    (how much of the virus it takes to fully infect someone), 4) turn on/off viral production from a 
                                                                                    contagious individual, 5) the infection period (how many days someone can be infected), 6) the 
                                                                                    contamination period (how many days an object is contaminated), and decide whether or not everyone 7)
                                                                                    wears masks, 8) whether people sanitizes objects, or 9) whether it is possible for people to die from 
                                                                                    the virus.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim6} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h3 style={{ color: 'black'}}></h3>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>You can also start, reset, and see the results when you decide to end the simulation. 
                                                                                    (Hint: The "See Results" button is not active until a simulation has been started and paused by you.)</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim7} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h3 style={{ color: 'black'}}></h3>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>When you start the simulation the "Start Simulation" button turns into a "Pause Simulation" 
                                                                                    button, people in the sim will begin to move around, and you are no longer able to place tiles 
                                                                                    in the simulation. The selection box is replaced with speed control to speed-up or slow-down 
                                                                                    the passage of time.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim8} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h3 style={{ color: 'black'}}></h3>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>When you want to see the results and end the simulation this message pops-up. You can see the 
                                                                                    results page and download the graphed results of the simulation from there.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim9} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h3 style={{ color: 'black'}}></h3>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>When you reset the simulation this message pops-up to make sure you want to whipe the grid 
                                                                                    clean of all objects and people.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={9999999}>
                    <img src={sim1} alt="" width="1300" height="600"/> 
                    <Carousel.Caption>
                        <h3 style={{ color: 'black'}}>The End!</h3>
                        <p style={{ color: 'black', margin: "0", display: "inline"}}>And that's everything you need to know! Be sure to experiment with the control panel and 
                                                                                    see what's different between simulations when something is changed!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Link to="/simulation">
                <Button style={padding}>Open Simulation</Button>
            </Link> 
            <Link to="/landing">
                <Button style={padding}>Return to Home Page</Button>
            </Link> 
        </div>
    );  
};

export default Tutorial;


const padding = {
    margin: "5px",
};
