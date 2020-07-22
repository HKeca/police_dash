import React, { useState, useEffect } from "react";
import VictimList from "./VictimList";

const NumbersContainer = (props) => {
  const [avgPerMonth, setAvgPerMonth] = useState();
  const [total, setTotal] = useState();
  const [names, setNames] = useState([]);

  const sumUpValues = (concatArray, concatFilter, dateArray) => {
    const concatenatedArray = [];
    const valueArray = [];
    const namesArray = [];
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

    //Concatenate Data Array to Date AND adds names to VictimList (concatenated with date in front for reference)
    for (let i = 0; i < concatArray.length; i++) {
      if (concatArray[i] === concatFilter && concatFilter !== "") {
        concatenatedArray.push(dateArray[i].toString().concat(concatArray[i]));
        namesArray.push(`${props.date[i]}${props.name[i]}`);
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
      namesArray: namesArray,
    };
  };

  useEffect(() => {
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

      //HANDLING VICTIM NAMES
      setNames(
        sumUpValues(props.concatenatedString, filterToCheck, props.date)
          .namesArray
      );

      let total = 0;
      let avgPerMonth = 0;
      values.forEach((value) => {
        total = total + value;
      });
      avgPerMonth = Math.round((total / values.length) * 10) / 10;

      setTotal(total);
      setAvgPerMonth(avgPerMonth);
    }
  }, [props.loaded]);

  return (
    <div className="number-container">
      <div>
        <h6>Total</h6>
        <h1>{total}</h1>
      </div>
      <br></br>
      <div>
        <h6>Average / mo</h6>
        <h1>{avgPerMonth}</h1>
      </div>
      <br></br>

      <VictimList names={names} filter={props.filter} />
    </div>
  );
};

export default NumbersContainer;
