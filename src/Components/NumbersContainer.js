import React from "react";

const NumbersContainer = (props) => {
  const retrieveCounts = () => {
    if (props.filter.race === "" && props.filter.state === "") {
      return props.date.length;
    }
  };

  return (
    <div className="number-container">
      <div>
        <h6>Total</h6>
        <h1>{props.loaded && retrieveCounts()}</h1>
      </div>
      <div>
        <h6>Average / mo</h6>
        <h1>###</h1>
      </div>
      <div>
        <h6>Total / 100,000 arrested in group</h6>
        <h1>###</h1>
      </div>
      <div>
        <h6>Total / 1,000,000 in group</h6>
        <h1>###</h1>
      </div>
    </div>
  );
};

export default NumbersContainer;
