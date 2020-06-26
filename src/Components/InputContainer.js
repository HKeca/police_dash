import React from "react";
import RaceDropdown from "./RaceDropdown";
import StateDropdown from "./StateDropdown";

const InputContainer = (props) => {
  return (
    <div className="input-container">
      <h1>Police Dashboard</h1>
      <RaceDropdown
        filter={props.race}
        filterHandler={props.filterHandler}
        filterName="race"
        title="Race"
      />
      <StateDropdown
        title="State"
        filterName="state"
        filterHandler={props.filterHandler}
      />
    </div>
  );
};

export default InputContainer;
