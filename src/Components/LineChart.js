import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  const [filter, setFilter] = useState("B");
  const [dateDataForLine, setDateDataForLine] = useState({
    data: { datasets: [], labels: [] },
  });

  const sumUpValues = (concatArray, concatFilter, dateArray) => {
    const concatenatedArray = [];
    const valueArray = [];
    const labelArray = [];

    //Get Distinct Dates For Labels
    for (let i = 0; i < dateArray.length; i++) {
      if (
        !labelArray.includes(dateArray[i].toString()) &&
        !isNaN(dateArray[i])
      ) {
        labelArray.push(dateArray[i].toString());
      }
    }

    //Concatenate Data Array to Date
    for (let i = 0; i < concatArray.length; i++) {
      if (concatArray[i] === concatFilter && concatFilter !== "") {
        concatenatedArray.push(dateArray[i].toString().concat(concatArray[i]));
      } else if (concatFilter === "" && dateArray[i]) {
        concatenatedArray.push(dateArray[i].toString());
      }
    }
    //Creates valueArray

    for (let i = 0; i < labelArray.length; i++) {
      const amountToAdd = concatenatedArray.filter(
        (datum) => datum.slice(0, 6) === labelArray[i]
      ).length;
      valueArray.push(amountToAdd);
    }

    return {
      valueArray: valueArray,
      concatFilter: concatFilter,
      labelArray: labelArray,
    };
  };

  const createDataSet = (labels, values) => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Fatal Shootings",
          data: values,
        },
      ],
    };
  };

  let dataToRender = {
    data: { datasets: [], labels: [] },
  };

  if (props.loaded) {
    //Checks if filter contains a state or not
    let filterToCheck = `${props.filter.race}${props.filter.state}`;
    // if (filterToCheck.length === 1) {
    //   filterToCheck = new RegExp(props.filter.race + "\\w\\w");
    // }

    //
    console.log(filterToCheck);
    const values = sumUpValues(
      props.concatenatedString,
      filterToCheck,
      props.date
    ).valueArray;
    const labels = sumUpValues(
      props.concatenatedString,
      filterToCheck,
      props.date
    ).labelArray;
    const concatFilter = sumUpValues(
      props.concatenatedString,
      filterToCheck,
      props.date
    ).concatFilter;
    dataToRender = createDataSet(labels, values);
  }

  return (
    <div style={{ flex: "4" }}>
      <Line data={dataToRender} responsive={true} maintainAspectRatio={false} />
    </div>
  );
};

export default LineChart;
