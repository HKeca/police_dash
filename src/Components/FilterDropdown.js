import React from "react";

const FilterDropdown = (props) => {
  const extractFilterOptions = (dataArray) => {
    const fitlerArray = [];

    for (let i = 0; i < dataArray.length; i++) {
      if (!fitlerArray.includes(dataArray[i])) {
        fitlerArray.push(dataArray[i]);
      }
    }

    return fitlerArray;
  };
  const fitlerToRender = extractFilterOptions(props.filter);

  const options = fitlerToRender.map((filter) => {
    return <option value={filter}>{filter}</option>;
  });

  const changeFilter = (event) => {
    props.filterHandler(props.filterName, event.target.value);
  };

  return (
    <React.Fragment>
      <h3>{props.title}</h3>
      <select className="filter-dropdown" onChange={changeFilter}>
        <option value="">All</option>
        {options}
      </select>
    </React.Fragment>
  );
};

export default FilterDropdown;
