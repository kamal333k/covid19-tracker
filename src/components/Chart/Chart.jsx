import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { StylesProvider } from "@material-ui/styles";
import styles from "./Chart.module.css";

import Chart from "react-google-charts";

const ChartComponent = ({
  data: { confirmed, recovered, deaths },
  country,
}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchApi();
    console.log("asdasd", dailyData);
  }, []);

  // console.log(
  //   "=====>>>>>",
  //   dailyData.map(({ confirmed, deaths, date }) => [
  //     new Date(date).toDateString(),
  //     confirmed,
  //     deaths,
  //   ])
  // );
  const lineChart =
    dailyData.length > 0 ? (
      <Chart
        width={"100%"}
        height={"520px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={[["Date", "Confirmed", "Deaths"]].concat(
          dailyData.map(({ confirmed, deaths, date }) => [
            new Date(date).toDateString(),
            confirmed,
            deaths,
          ])
        )}
        options={{
          title: "Current Demography around the world",
          chartArea: { width: "70%", height: "70%" },
        }}
        legendToggle
      />
    ) : null;
  const barChart = confirmed ? (
    <Chart
      width={"100%"}
      height={"520px"}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={[
        ["", "Infected", "Recovered", "deaths"],
        [country, confirmed.value, recovered.value, deaths.value],
      ]}
      options={{
        // Material design options
        chartArea: { width: "100%", height: "100%" },
        chart: {
          title: `Current state in ${country}`,
        },
        colors: ["#7f80ff", "#a5ff9a", "#ff948d"],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default ChartComponent;
