import React from "react";
import LineChart from "./LineChart";
import RadarChart from './RadarChart';
import NumbersContainer from "./NumbersContainer";

const MainContainer = (props) => {
  return (
    <React.Fragment>
      <div className="main-container">
        <NumbersContainer
          concatenatedString={props.concatenatedString}
          filter={props.filter}
          loaded={props.loaded}
          date={props.date}
          name={props.name}
        />
        <div style={{flex: '4', overflowY: 'auto'}}>
        <LineChart
          loaded={props.loaded}
          date={props.date}
          race={props.race}
          concatenatedString={props.concatenatedString}
          filter={props.filter}
        />
        <RadarChart
          loaded={props.loaded}
          radarConcatString={props.radarConcatString}
          filter={props.filter}/>
        </div>
        
      </div>
    </React.Fragment>
  );
};

export default MainContainer;
