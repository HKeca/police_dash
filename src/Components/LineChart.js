import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  const [filter, setFilter] = useState("B");
  const [dateDataForLine, setDateDataForLine] = useState({
    data: { datasets: [], labels: [] },
  });

  const sumUpValues = (dataArray1, filter1, dateArray) => {
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
    for (let i = 0; i < dataArray1.length; i++) {
      if (dataArray1[i] === filter1 && filter1 !== "") {
        concatenatedArray.push(dateArray[i].toString().concat(dataArray1[i]));
      } else if (filter1 === "" && dateArray[i]) {
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
      filter1: filter1,
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

  // const changeFilter = (event) => {
  //   setFilter(event.target.value);

  //   if (props.loaded) {
  //     const values = sumUpValues(props.race, event.target.value, props.date)
  //       .valueArray;
  //     const labels = sumUpValues(props.race, event.target.value, props.date)
  //       .labelArray;
  //     const filter = sumUpValues(props.race, event.target.value, props.date)
  //       .filter1;

  //     console.log(values, labels, filter);

  //     setDateDataForLine(createDataSet(labels, values));
  //   }
  // };

  let dataToRender = {
    data: { datasets: [], labels: [] },
  };

  if (props.loaded) {
    const values = sumUpValues(props.race, props.filter.race, props.date)
      .valueArray;
    const labels = sumUpValues(props.race, props.filter.race, props.date)
      .labelArray;
    const filter = sumUpValues(props.race, props.filter.race, props.date)
      .filter1;
    dataToRender = createDataSet(labels, values);
  }

  return (
    <div style={{flex: '4'}}>
      <Line data={dataToRender} responsive={true} maintainAspectRatio={false} />
    </div>
  );
};

export default LineChart;
