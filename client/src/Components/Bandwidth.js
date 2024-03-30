import React, { useState, useEffect } from "react";
import "../../node_modules/react-internet-meter/dist/index.css";
import { ReactInternetSpeedMeter } from "react-internet-meter";

import './Bandwidth.css'; // Import CSS file for styling

const BandwidthDisplay = () => {
    const [speeds, setSpeeds] = useState([]);
    const [averageSpeed, setAverageSpeed] = useState(null);
    const [isTestingComplete, setIsTestingComplete] = useState(false);
  
    useEffect(() => {
      if (speeds.length === 5 && !isTestingComplete) {
        // Calculate the average speed when 10 readings are obtained
        const total = speeds.reduce((acc, curr) => acc + parseFloat(curr), 0);
        const average = total / speeds.length;
        setAverageSpeed(average.toFixed(2));
        setIsTestingComplete(true);
      }
    }, [speeds, isTestingComplete]);
  
    const handleSpeedTest = (speed) => {
      if (speeds.length < 5) {
        setSpeeds(prevSpeeds => [...prevSpeeds, speed]);
      }
    };
  
    return (
      <div className="bandwidth-container">
          <h1>Bandwidth Information</h1>
        
        <ReactInternetSpeedMeter
          txtSubHeading="Internet connection is slow"
          outputType=""
          customClassName={null}
          pingInterval={2000}
          txtMainHeading="Opps..."
          thresholdUnit="megabyte"
          threshold={50}
          imageUrl="https://www.sefram.com/images/products/photos/hi_res/7220.jpg"
          downloadSize="1561257"
          
          callbackFunctionOnNetworkTest={handleSpeedTest}
        />
        <div className="card-body mt-4">
          {isTestingComplete ? (
            averageSpeed !== null ? (
              <span className="display-6">{averageSpeed} MB/s</span>
            ) : (
              <span className="display-6">Unable to calculate average speed.</span>
            )
          ) : (
            <span className="display-6">Testing internet speed...</span>
          )}
        </div>

        <div className="bandwidth-info">
              <p className="display-8">Download Speed: {averageSpeed?averageSpeed:0} Mbps</p>
              
          </div>
      </div>
    );
  
};

export default BandwidthDisplay;
