import React from "react";
import FilterDropdown from "./FilterDropdown";

const InputContainer = (props) => {
  return (
    <div className="input-container">
      <h1>Police Dashboard</h1>
      <FilterDropdown
        filter={props.race}
        filterHandler={props.filterHandler}
        filterName='race'
        title='Race'
      />
    </div>
  );
};

export default InputContainer;
