import React from "react";
import LineChart from "./LineChart";
import NumbersContainer from "./NumbersContainer";

const MainContainer = (props) => {
  return (
    <React.Fragment>
        <div className="main-container">
          <NumbersContainer />
          <LineChart
            loaded={props.loaded}
            date={props.date}
            race={props.race}
            concatenatedString={props.concatenatedString}
            filter={props.filter}
          />
        </div>
    </React.Fragment>
  );
};

export default MainContainer;
