import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = (props) => {
  const [radarData, setRadarData] = useState({
    labels: [
      "Percentage Not Armed With Gun",
      "Percentage Signs of Mental Illness",
      "Percentage Male",
    ],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: "rgba(26, 188, 156, .4)",
      },
    ],
  });

  const createData = () => {
    let raceFilter;
    let stateFilter;
    let stringFilter;

    if (props.filter.race === "") {
      raceFilter = "-";
    } else {
      raceFilter = props.filter.race;
    }

    if (props.filter.state === "") {
      stateFilter = "--";
    } else {
      stateFilter = props.filter.state;
    }

    stringFilter = raceFilter + stateFilter;

    let percentUnarmed;
    let percentMale;
    let percentMental;

    let totalUnarmed = props.radarConcatString.filter(
      (str) =>
        str.substring(0, 3) === stringFilter && str.substring(3, 4) === "F"
    ).length;
    let totalMale = props.radarConcatString.filter(
      (str) =>
        str.substring(0, 3) === stringFilter && str.substring(4, 5) === "M"
    ).length;
    let totalMental = props.radarConcatString.filter(
      (str) =>
        str.substring(0, 3) === stringFilter && str.substring(5, 6) === "T"
    ).length;
    let totalInFilter = props.radarConcatString.filter(
      (str) => str.substring(0, 3) === stringFilter
    ).length;

    percentUnarmed = Math.round((totalUnarmed / totalInFilter) * 100);
    percentMale = Math.round((totalMale / totalInFilter) * 100);
    percentMental = Math.round((totalMental / totalInFilter) * 100);

    return {
      labels: [
        "Percentage Not Armed With Gun",
        "Percentage Signs of Mental Illness",
        "Percentage Male",
      ],
      datasets: [
        {
          data: [percentUnarmed, percentMental, percentMale],
          backgroundColor: "rgba(26, 188, 156, .4)",
        },
      ],
    };
  };

  useEffect(() => {
    if (props.loaded) {
      setRadarData(createData());
    }
  }, [props.loaded]);

  const options = {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div>
      <Radar
        data={radarData}
        responsive={true}
        options={options}
        maintainAspectRatio={false}
      />
    </div>
  );
};

export default RadarChart;
