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
          } else {
            concatenatedString.push(`${splitDatum[7]}${splitDatum[9]}`);
          }
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
        setLoaded(true);
      });
  }, [filter]);

  const filterHandler = (filterName, filterSelection) => {
    setLoaded(false);
    const filterToAdd = { ...filter };
    filterToAdd[filterName] = filterSelection;
    setFilter(filterToAdd);
    console.log(filterToAdd);
  };

  return (
    <div className="App">
      <InputContainer race={race} filterHandler={filterHandler} />

      <MainContainer
        loaded={loaded}
        date={date}
        race={race}
        concatenatedString={concatenatedString}
        filter={filter}
      />
    </div>
  );
};

export default App;
