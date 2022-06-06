import React, { useState } from 'react';
import { Button, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import '../../../styles/control_group_styles.css';
import Simulation from '../Simulation';
import ConfirmationModal from './ConfirmationModal';
import TutorialCarousel from '../../Tutorial/components/TutorialCarousel';

const groupStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "25vh",
    // width: "55vw",
    margin: "auto",
    backgroundColor: "#A9BFCF",
    borderRadius: "10px",
};

const ControlGroup = ({
    sim,
    updateSim,
    toggleRunning,
    running, 
    finalized,
    reset,
    started,
    updateStarted,
    data
}) => {
    const [ showModal, setShowModal ] = useState(false);
    const [ showRedirect, setShowRedirect ] = useState(false);
    const [ showHelp, setShowHelp ] = useState(false);
    const [ redirect, setRedirect ] = useState(false);

    return (
        <div className="outer-div" style={groupStyle}>
            <div className="form">
                <div className="col1">
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Height of Grid
                                </Tooltip>
                            }
                        >
                            <p>Grid Height</p>
                        </OverlayTrigger>
                        <input type="number" min="0" onChange={e => updateSim({height: parseInt(e.target.value)})} value={sim.height} disabled={started} />
                    </div>
                    <div className="line-item">
                    <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Width of Grid
                                </Tooltip>
                            }
                        >
                            <p>Grid Width</p>
                        </OverlayTrigger>
                        <input type="number" min="0" onChange={e => updateSim({width: parseInt(e.target.value)})} value={sim.width} disabled={started} />
                    </div>
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Length of the simulation in days (1 day = 24 ticks)
                                </Tooltip>
                            }
                        >
                            <p>Days</p>
                        </OverlayTrigger>
                        <input type="number" onChange={e => updateSim({simulationLength: parseInt(e.target.value)})} value={sim.simulationLength} disabled={started} /> 
                    </div>
                </div>
                <div className="col2">
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Viral amount (in virons) allowed before being infected
                                    <br></br>
                                    Default = 10<sup>5</sup> virons
                                </Tooltip>
                            }
                        >
                            <p>Viral Threshold</p>
                        </OverlayTrigger>
                        <input className="large-input" type="number" onChange={e => updateSim({viralThreshold: parseInt(e.target.value)})} value={sim.viralThreshold} disabled={started} />
                    </div>
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Rate at which virons are produced by a person per tick
                                    <br></br>
                                    Low = 10<sup>5</sup> to 10<sup>7</sup> per tick
                                    <br></br>
                                    High = 10<sup>7</sup> to 10<sup>11</sup> per tick
                                </Tooltip>
                            }
                        >
                            <p>Viral Production</p>
                        </OverlayTrigger>
                        <Button
                            variant={sim.viralProduction ? 'success' : 'danger'}
                            onClick={e => {
                                sim.viralProduction ? updateSim({viralProduction: false}) : updateSim({viralProduction: true});
                            }}
                            disabled={started}
                        >{sim.viralProduction ? 'Low' : 'High'}</Button>
                    </div>
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Length of time in days a person can be infected before resisting infection
                                </Tooltip>
                            }
                        >
                            <p>Infected Period</p>
                        </OverlayTrigger>
                        <input type="number" onChange={e => updateSim({contagiousPeriod: parseInt(e.target.value)})} value={sim.contagiousPeriod} disabled={started} />
                    </div>
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Length of time in days a person can be contaminated before virus begins to die 
                                </Tooltip>
                            }
                        >
                            <p>Contamination Period</p>
                        </OverlayTrigger>
                        <input type="number" onChange={e => updateSim({contaminatedPeriod: parseInt(e.target.value)})} value={sim.contaminatedPeriod} disabled={started} />
                    </div>
                </div>
                <div className="col3">
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Whether or not masks are worn
                                </Tooltip>
                            }
                        >
                            <p>Masks</p>
                        </OverlayTrigger>
                        <Button 
                            variant={sim.peopleMasked ? 'success' : 'danger'}
                            onClick={() => sim.peopleMasked ? updateSim({peopleMasked: false}) : updateSim({peopleMasked: true})}
                            disabled={started}
                        >{sim.peopleMasked ? 'On' : 'Off'}</Button>
                    </div>
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Whether or not people sanitize
                                </Tooltip>
                            }
                        >
                            <p>Sanitization</p>
                        </OverlayTrigger>
                        <Button 
                            variant={sim.itemsSanitized ? 'success' : 'danger'}
                            onClick={() => sim.itemsSanitized ? updateSim({itemsSanitized: false}) : updateSim({itemsSanitized: true})}
                            disabled={started}
                        >{sim.itemsSanitized ? 'On' : 'Off'}</Button>
                    </div>
                    <div className="line-item">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Whether or not people can die
                                </Tooltip>
                            }
                        >
                            <p>Death</p>
                        </OverlayTrigger>
                        <Button 
                            variant={sim.canDie ? 'success' : 'danger'}
                            onClick={() => sim.canDie ? updateSim({canDie: false}) : updateSim({canDie: true})}
                            disabled={started}
                        >{sim.canDie ? 'On' : 'Off'}</Button>
                    </div>
                </div>
                <div className="col4">
                    <div className="simple-col">
                        <Button disabled={finalized} onClick={() => {
                            if (!running) {
                                toggleRunning(true);
                            } else {
                                toggleRunning(false);
                            }
                            updateStarted(true);
                        }} variant={running ? 'warning' : 'success'}>{running ? 'Pause' : 'Start'} Simulation</Button>
                        <Button 
                            variant="primary" 
                            disabled={running || !started} 
                            onClick={() => setShowRedirect(true)}
                        >See Results</Button>
                        <Button variant="danger" onClick={() => setShowModal(true)}>Reset Simulation</Button>
                        <Button variant="info" onClick={() => setShowHelp(true)}>Help</Button>

                        <ConfirmationModal 
                            callback={() => {
                                setShowModal(false);
                                reset();
                            }} onHide={() => setShowModal(false)} show={showModal} 
                            title={'Confirm Reset'}
                            message={'Are you sure you want to reset the simulation? All previously recorded data will be lost.'}
                        />
                        <ConfirmationModal 
                            callback={() => {
                                setShowRedirect(false);
                                setRedirect(true);
                            }} onHide={() => setShowRedirect(false)} show={showRedirect} 
                            title={'End Simulation'}
                            message={'This action will take you to the results page. Do you wish to continue?'}
                        />
                        { redirect ? <Redirect to={{pathname: '/simulation/results', data: data}} /> : <></> }
                        <TutorialCarousel show={showHelp} onHide={() => setShowHelp(false)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlGroup;