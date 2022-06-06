import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';

import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    Tooltip,
    Legend,
} from 'recharts';

const Results = () => {
    const location = useLocation();
    console.log(location);
    const data = location.data ? location.data : [];

    const csvData = [
        ['Day #', 'Viron Count', '# of Infected People', '# of Contaminated Items']
    ];

    data.forEach(point => {
        csvData.push([point.name, point.virons, point.infections, point.contaminations]);
    });

    const DataFormater = (number) => {
        if (number > 1000000000000) {
            return (number / 1000000000000).toString() + 'T';
        } else if (number > 1000000000){
          return (number/1000000000).toString() + 'B';
        } else if (number > 1000000){
          return (number/1000000).toString() + 'M';
        } else if (number > 1000){
          return (number/1000).toString() + 'K';
        } else{
          return number.toString();
        }
    }

    return (
        <div style={container}>
            <div style={titleBlock}>
                <h1>Results</h1>
            </div>
            { data.length === 0 ? 
                <div style={nothingTag}>
                    <p className="lead">No data yet. Please run the simulation first!</p> 
                    <br />
                    <Link to="/simulation">
                        <Button variant="primary">To Simulation</Button>
                    </Link>
                </div>
                
                :
                <div style={multiChartContainer}>
                    <h3>Viron Count Per Day</h3>
                    <div style={chartContainer}>
                        <LineChart width={800} height={300} data={data}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <XAxis dataKey="name" label={{ value: 'Days', position: 'insideBottomLeft', offset: -10 }} />
                            <YAxis tickFormatter={DataFormater} label={{ value: 'Viron Count', angle: -90, position: 'insideLeft', dy: 50 }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="virons" stroke="red" />
                        </LineChart>
                    </div>
                    <br />
                    <h3>Infection and Contamination Count Per Day</h3>
                    <div style={chartContainer}>
                        <LineChart width={800} height={300} data={data}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <XAxis dataKey="name" label={{ value: 'Days', position: 'insideBottomLeft', offset: -10 }} />
                            <YAxis label={{ value: '# of People', angle: -90, position: 'insideLeft', dy: 50 }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="infections" stroke="blue" />
                            <Line type="monotone" dataKey="contaminations" stroke="green" />
                        </LineChart>
                    </div>
                    <br />
                    <div style={{
                        display: "grid",
                        placeItems: "center",
                        gridTemplateColumns: "1fr 1fr",
                        gridGap: "5px",
                    }}>
                        <CSVLink data={csvData} filename={'caid.csv'}>
                            <Button style={{width: "10rem"}}>Download as CSV</Button>
                        </CSVLink>
                        <Link to="/">
                            <Button style={{width: "10rem"}}>Back to Home</Button>
                        </Link>
                    </div>
                </div>
            }       
        </div>
    );
};

export default Results;

const nothingTag = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

const multiChartContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}; 

const chartContainer = {
    backgroundColor: "white",
    borderRadius: "10px",
    display: "grid",
    placeItems: "center",
};

const titleBlock = {
    height: "10vh"
};

const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    overflow: "auto",
};