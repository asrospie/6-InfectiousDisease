import React, { useState } from 'react';
import Landing from './pages/landing/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import About from './pages/About/About';
import Tutorial from './pages/Tutorial/Tutorial';
import Simulation from './pages/Simulation/Simulation';
import Results from './pages/Results/Results';

const App = () => {
    const [ id, setId ] = useState(0); // used to reset simulation

    function reset() {
        setId(old => old + 1);
    }

    return (
        <Router basename='/'>
            <Switch>
                <Route path="/simulation/results">
                    <Results />
                </Route>
                <Route path="/simulation">
                    <Simulation key={id} reset={reset} />
                </Route>
                <Route path="/tutorial">
                    <Tutorial />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Landing />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;