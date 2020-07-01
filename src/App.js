import React, { useState, useEffect } from "react";
import MainContainer from "./Components/MainContainer";
import InputContainer from "./Components/InputContainer";

import "./App.css";

const App = () => {
  const [id, setID] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [mannerOfDeath, setMannerOfDeath] = useState();
  const [armed, setArmed] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [race, setRace] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [signsOfMentalIllness, setSignsOfMentalIllness] = useState();
  const [threatLevel, setThreatLevel] = useState();
  const [flee, setFlee] = useState();
  const [bodyCamera, setBodyCamera] = useState();
  const [concatenatedString, setConcatenatedString] = useState();
  const [loaded, setLoaded] = useState(false);
  const [radarConcatString, setRadarConcatString] = useState();

  const [filter, setFilter] = useState({
    race: "",
    age: "",
    state: "",
  });

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/fatal-police-shootings-data.csv"
    )
      .then((res) => res.text())
      .then((text) => {
        const splitIntoRows = text.split("\n");
        const splitWithoutHeaders = splitIntoRows.slice(1);
        let id = [];
        let name = [];
        let date = [];
        let mannerOfDeath = [];
        let armed = [];
        let age = [];
        let gender = [];
        let race = [];
        let city = [];
        let state = [];
        let signsOfMentalIllness = [];
        let threatLevel = [];
        let flee = [];
        let bodyCamera = [];
        let concatenatedString = [];
        let radarConcatString = [];

        splitWithoutHeaders.forEach((row) => {
          const rowWithoutCommas = row.replace(/,\s/, " ");
          const splitDatum = rowWithoutCommas.split(",");
          id.push(splitDatum[0]);
          name.push(splitDatum[1]);
          //CHOOSING TO USE YEAR-MONTH FOR DATES. FORMAT: 202004
          //Currently not replacing all hyphens in date. Keep in mind
          if (splitDatum[2]) {
            const dateRemoveHyphen = splitDatum[2].replace("-", "");
            date.push(Math.floor(parseInt(dateRemoveHyphen)));
          }

          mannerOfDeath.push(splitDatum[3]);
          armed.push(splitDatum[4]);
          age.push(splitDatum[5]);
          gender.push(splitDatum[6]);
          race.push(splitDatum[7]);
          city.push(splitDatum[8]);
          state.push(splitDatum[9]);
          signsOfMentalIllness.push(splitDatum[10]);
          threatLevel.push(splitDatum[11]);
          flee.push(splitDatum[12]);
          bodyCamera.push(splitDatum[13]);

          if (filter.state === "") {
            concatenatedString.push(`${splitDatum[7]}`);
          } else if (filter.race === "") {
            concatenatedString.push(`${splitDatum[9]}`);
          } else {
            concatenatedString.push(`${splitDatum[7]}${splitDatum[9]}`);
          }

          //THE FOLLOWING FILTER IS FOR RADAR CHART
          let radarConcat;
          if (filter.race === "") {
            radarConcat = "-";
          } else {
            radarConcat = splitDatum[7];
          }

          if (filter.state === "") {
            radarConcat = radarConcat + "--";
          } else {
            radarConcat = radarConcat + splitDatum[9];
          }

          //Checking for armed with gun
          if (splitDatum[4] && splitDatum[4].includes("gun")) {
            radarConcat = radarConcat + "T";
          } else {
            radarConcat = radarConcat + "F";
          }

          //Checking for male/female
          if (splitDatum[6] === "M" || splitDatum[6] === "F") {
            radarConcat = radarConcat + splitDatum[6];
          } else {
            radarConcat = radarConcat + "-";
          }

          //Checking for mental illness
          if (splitDatum[10] === "True") {
            radarConcat = radarConcat + "T";
          } else if (splitDatum[10] === "False") {
            radarConcat = radarConcat + "F";
          } else {
            radarConcat = radarConcat + "-";
          }

          //Check for body cam
          // if (splitDatum[13] === "True") {
          //   radarConcat = radarConcat + "T";
          // } else if (splitDatum[13] === "False") {
          //   radarConcat = radarConcat + "F";
          // } else {
          //   radarConcat = radarConcat + "-";
          // }

          // radarConcat = radarConcat + splitDatum[13];
          //
          radarConcatString.push(radarConcat);
        });

        setID(id);
        setName(name);
        setDate(date);
        setMannerOfDeath(mannerOfDeath);
        setArmed(armed);
        setAge(age);
        setGender(gender);
        setRace(race);
        setCity(city);
        setState(state);
        setSignsOfMentalIllness(signsOfMentalIllness);
        setThreatLevel(threatLevel);
        setFlee(flee);
        setBodyCamera(bodyCamera);
        setConcatenatedString(concatenatedString);
        setRadarConcatString(radarConcatString);
        setLoaded(true);
      });
  }, [filter]);

  const filterHandler = (filterName, filterSelection) => {
    setLoaded(false);
    const filterToAdd = { ...filter };
    filterToAdd[filterName] = filterSelection;
    setFilter(filterToAdd);
  };

  return (
    <div className="App">
      <InputContainer race={race} filterHandler={filterHandler} />

      <MainContainer
        loaded={loaded}
        date={date}
        race={race}
        concatenatedString={concatenatedString}
        radarConcatString={radarConcatString}
        filter={filter}
      />
    </div>
  );
};

export default App;
