import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { StylesProvider } from "@material-ui/styles";
import styles from "./Chart.module.css";
const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchApi();
    console.log("asdasd", dailyData);
  }, [setDailyData]);

  const lineChart =
    dailyData.length > 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toDateString()),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "deaths"],
        datasets: [
          {
            label: 'People',
            data: [confirmed.value, recovered.value, deaths.value],
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            fill: true,
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;