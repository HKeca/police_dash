import React from "react";

const RaceDropdown = (props) => {
  const extractFilterOptions = (dataArray) => {
    const fitlerArray = [];

    for (let i = 0; i < dataArray.length; i++) {
      if (!fitlerArray.includes(dataArray[i])) {
        fitlerArray.push(dataArray[i]);
      }
    }

    return fitlerArray;
  };
  const fitlerToRender = [
    { title: "All", filter: "" },
    { title: "White", filter: "W" },
    { title: "Black", filter: "B" },
  ];

  const options = fitlerToRender.map((filter) => {
    return <option value={filter.filter}>{filter.title}</option>;
  });

  const changeFilter = (event) => {
    props.filterHandler(props.filterName, event.target.value);
  };

  return (
    <React.Fragment>
      <h3>{props.title}</h3>
      <select className="filter-dropdown" onChange={changeFilter}>
        {options}
      </select>
    </React.Fragment>
  );
};

export default RaceDropdown;
