import axios from "axios";
import React, { useState, useEffect } from "react";
import { WeatherApi } from "../../apis/WeatherApi";
import "./Charts.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Sun from "../../img/sun30.png";
import Moon from "../../img/moon30.png";
import SunEdit from "../../img/sun25.png";
import MoonEdit from "../../img/moon25.png";
import Hot20 from "../../img/hot20.png";
import Freeze20 from "../../img/freeze20.png";
import { data } from "../../apis/WeatherData";

const Charts = () => {
  //IF YOU WANNA GET DATA FROM API,UNCOMMENT THE CODE BASE BELOW
  // const URL = "https://api.openweathermap.org/data/2.5/forecast";
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .post(`${URL}?id=1880252&units=metric&appid=${WeatherApi.apiKey}`)
  //         .then((data) => console.log(JSON.stringify(data)));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [URL]);
  const [date, setDate] = useState([data.data.list]);
  const [symbol, setSymbol] = useState({});
  useEffect(() => {
    date[0].map((dt) =>
      setSymbol(Math.round(dt.dt_txt.split(" ")[1].slice(0, 2)))
    );
  }, [date]);
  //SET CUSTOM SYMBOL FOR EACH DOT OF TIDE DEPEND ON VALUE
  const tideData = date[0].map((dt) => {
    if (Math.round(dt.dt_txt.split(" ")[1].slice(0, 2)) >= 12) {
      dt = {
        y: dt.main.sea_level - dt.main.grnd_level,
        name: "Day Time",
        marker: {
          symbol: "url(" + Sun + ")",
        },
      };
    } else {
      dt = {
        y: dt.main.sea_level - dt.main.grnd_level,
        name: "Night Time",
        marker: {
          symbol: "url(" + Moon + ")",
        },
      };
    }
    return dt;
  });
  //SET CUSTOM SYMBOL FOR EACH DOT OF HUMIDITY DEPEND ON VALUE
  const humidData = date[0].map((dt) => {
    if (Math.round(dt.dt_txt.split(" ")[1].slice(0, 2)) >= 12) {
      dt = {
        y: dt.main.humidity,
        name: "Day Time",
        marker: {
          symbol: "url(" + SunEdit + ")",
        },
      };
    } else {
      dt = {
        y: dt.main.humidity,
        name: "Night Time",
        marker: {
          symbol: "url(" + MoonEdit + ")",
        },
      };
    }
    return dt;
  });
  //SET CUSTOM SYMBOL FOR EACH DOT OF TEMPORATURE DEPEND ON VALUE
  const tempData = date[0].map((dt) => {
    if (dt.main.temp > 27) {
      dt = {
        y: dt.main.temp,
        name: "Temporature-" + dt.dt_txt.split(" ")[1],
        marker: {
          symbol: "url(" + Hot20 + ")",
        },
      };
    } else {
      dt = {
        y: dt.main.temp,
        name: "Temporature-" + dt.dt_txt.split(" ")[1],
        marker: {
          symbol: "url(" + Freeze20 + ")",
        },
      };
    }
    return dt;
  });
  //OPTION TO CONFIGURE CHART (REQUIRED)
  const options = {
    rangeSelector: {
      selected: 1,
    },
    chart: {
      type: "area",
      width: 4000,
    },
    title: {
      text: " .",
    },

    xAxis: {
      categories: date[0].map((dt) => {
        return `${dt.dt_txt.split(" ")[1]}<br/>${dt.dt_txt.split(" ")[0]}`;
      }),
    },
    yAxis: {
      title: {
        text: "Tide & Temporature & humidity ",
      },
    },

    series: [
      {
        name: "Humid ~ %",
        data: humidData,
        shape: "squarepin",
        backgroundColor: "#2ecc71",
      },
      {
        name: "Tide ~ m",
        data: tideData,
        shape: "squarepin",
      },
      {
        name: "Temp ~ °C",
        data: tempData,
        shape: "squarepin",
      },
    ],
  };
  return (
    <div className="charts-show">
      <div className="chart__title--abs">
        Tide•<span className="__title--abs-name">Sunrire & Sunset</span>
      </div>
      {/* <div className="chart__daily--change">
        <img className="mode" src={Sun} alt="Mode Sun and Moon " />
      </div> */}
      <div className="label--hidden-brand"></div>
      <div className="chart-container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Charts;
