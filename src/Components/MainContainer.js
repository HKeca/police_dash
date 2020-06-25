import React from "react";
import LineChart from "./LineChart";

const MainContainer = (props) => {
  return (
    <div className="main-container">
      {props.loaded && (
        <LineChart
          loaded={props.loaded}
          date={props.date}
          race={props.race}
          filter={props.filter}
        />
      )}
    </div>
  );
};

export default MainContainer;
