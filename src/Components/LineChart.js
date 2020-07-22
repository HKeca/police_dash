import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  // const [filter, setFilter] = useState("B");
  // const [dateDataForLine, setDateDataForLine] = useState({
  //   data: { datasets: [], labels: [] },
  // });

  const sumUpValues = (concatArray, concatFilter, dateArray) => {
    const concatenatedArray = [];
    const valueArray = [];
    const labelArray = [];

    const dateNumberToMonth = (dateNumber) => {
      const conversion = [
        { number: "01", month: "Jan" },
        { number: "02", month: "Feb" },
        { number: "03", month: "Mar" },
        { number: "04", month: "Apr" },
        { number: "05", month: "May" },
        { number: "06", month: "Jun" },
        { number: "07", month: "Jul" },
        { number: "08", month: "Aug" },
        { number: "09", month: "Sep" },
        { number: "10", month: "Oct" },
        { number: "11", month: "Nov" },
        { number: "12", month: "Dec" },
      ];

      for (let i = 0; i < conversion.length; i++) {
        if (dateNumber === conversion[i].number) {
          return conversion[i].month;
        }
      }
    };

    //Get Distinct Dates For Labels
    for (let i = 0; i < dateArray.length; i++) {
      if (
        !labelArray.includes(dateArray[i].toString()) &&
        !isNaN(dateArray[i])
      ) {
        labelArray.push(dateArray[i].toString());
      }
    }

    //Convert Date Labels to Months
    const convertedLabelArray = labelArray.map((label) => {
      return `${dateNumberToMonth(label.substring(4, 6))} ${label.substring(
        0,
        4
      )}`;
    });

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
      labelArray: convertedLabelArray,
    };
  };

  const createDataSet = (labels, values) => {
    return {
      labels: labels,
      datasets: [
        {
          label: `Fatal Shootings - Race: ${
            props.filter.race === "" ? "All" : props.filter.race
          }, State: ${props.filter.state === "" ? "All" : props.filter.state}`,
          data: values,
          backgroundColor: "rgba(26, 188, 156, .4)",
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
    <div>
      <Line data={dataToRender} responsive={true} maintainAspectRatio={false} />
    </div>
  );
};

export default LineChart;
