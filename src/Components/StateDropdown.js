import React from "react";

const StateDropdown = (props) => {
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
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

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

export default StateDropdown;
