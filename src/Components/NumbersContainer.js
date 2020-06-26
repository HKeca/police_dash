import React from "react";

const NumbersContainer = () => {
  return (
    <div className="number-container">
      <div>
        <h6>Total</h6>
        <h1>###</h1>
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
