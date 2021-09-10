import React, { useState, useEffect, useContext } from "react";
import "./Charts.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SunEdit from "../../img/sun25.png";
import MoonEdit from "../../img/moon25.png";
import Sun from "../../img/sun30.png";
// import { dataWeather } from "../../apis/WeatherData";
import { dataEdit } from "../../apis/WeatherDataMock";
import bellcurve from "highcharts/modules/histogram-bellcurve";
import {
  calculatePlots,
  checkTimeCurve,
  handleResizeWidth,
} from "../../helpers/helpers";
import { Ctx } from "../../contexts/Contexts";
bellcurve(Highcharts);
export const execCalculatePlots = (data) => calculatePlots(data);
export const execCheckTimeCurve = (time) => checkTimeCurve(time);
export const exechandleResizeWidth = (dataLength) =>
  handleResizeWidth(dataLength);

const Charts = (props) => {
  //IF YOU WANNA GET DATA FROM API,USING CODE IN CONTEXT
  const [dataMock, setDataMock] = useState(dataEdit);
  const [widthChart, setWidthChart] = useState(
    handleResizeWidth(dataMock.length)
  );
  //TEST DATA FROM API
  const { data } = useContext(Ctx);
  useEffect(() => {
    const setDataChart = () => {
      setDataMock(dataEdit);
    };
    setDataChart();
  }, []);
  useEffect(() => {
    const resizeHandle = () => {
      setWidthChart(handleResizeWidth(dataMock.length));
    };
    window.addEventListener("resize", () => resizeHandle(dataMock.length));
  }, [dataMock.length]);

  //CUSTOM DATA OF TIDE USING NEW DATA
  const tideDataNew = dataMock.map((dt) => {
    if (Number(dt.dt_txt.slice(0, 2)) >= 12) {
      dt = {
        y: dt.main.sea_level - dt.main.grnd_level,
        name: "Day Time",
        marker: {
          hover: {
            symbol: "url(" + SunEdit + ")",
          },
        },
      };
    } else {
      dt = {
        y: dt.main.sea_level - dt.main.grnd_level,
        name: "Night Time",
        marker: {
          hover: {
            symbol: "url(" + MoonEdit + ")",
          },
        },
      };
    }
    return dt;
  });
  //CUSTOM DAYTIME OF TIDE USING NEW DATA
  const timeDay = dataMock.map((dt) => {
    let timeTravel = Number(dt.dt_txt.slice(0, 2));
    if (timeTravel >= 6 && timeTravel <= 18) {
      dt = {
        name: "Day",
        y: checkTimeCurve(timeTravel),
        marker: {
          enabled: checkTimeCurve(timeTravel) === 16 ? true : false,
          symbol: "url(" + Sun + ")",
        },
        color: "#f9ca24",
        plotBackgroundColor: "#e74c3c",
        segmentColor: "#30336b",
        dataLabels: {
          enabled: false,
        },
      };
    }
    return dt;
  });

  //CUSTOM NIGHTTIME OF TIDE USING NEW DATA
  const timeNight = dataMock.map((dt2) => {
    let timeTravel = Number(dt2.dt_txt.slice(0, 2));
    if (timeTravel >= 18 || timeTravel <= 6) {
      dt2 = {
        name: "Night",
        y: execCheckTimeCurve(timeTravel),
        color: "#30336b",
        segmentColor: "#30336b",
      };
    }
    return dt2;
  });
  //OPTION TO CONFIGURE CHART (REQUIRED)
  const options = {
    chart: {
      type: "areaspline",
      zoomType: "x",
      width: widthChart,
      events: {
        load: function () {
          if (this.options.chart.type === "areaspline") {
            this.xAxis[0].update({
              minPadding: -0.062,
              maxPadding: -0.062,
            });
          }
        },
      },
    },
    scrollbar: {
      enabled: false,
    },
    rangeSelector: {
      selected: 1,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        return `<h3>
        Tide: ${this.y}m</h3>`;
      },
      caretSize: 5,
      cornerRadius: 4,
      xPadding: 10,
      yPadding: 10,
    },
    title: {
      text: " .",
    },
    xAxis: [
      {
        categories: dataMock.map((dt) => {
          if (Number(dt.dt_txt.slice(0, 2)) > 12) {
            return `${dt.dt_txt.slice(0, 5)}PM`;
          } else {
            return `${dt.dt_txt.slice(0, 5)}AM`;
          }
        }),
        plotBands: execCalculatePlots(dataMock),
      },
      {
        alignTicks: false,
        opposite: true,
      },
      {
        alignTicks: false,
        opposite: true,
      },
    ],
    plotOptions: {
      series: {
        pointPlacement: "on",
        lineWidth: 1,
        // marker: {
        //   enabled: false,
        // },
      },
    },
    yAxis: [
      {
        title: {
          text: "",
        },
        showEmpty: false,
        lineWidth: 1,
      },
      {
        visible: false,
        title: {
          text: "",
        },
        showEmpty: false,
      },
      {
        visible: false,
        title: {
          text: "",
        },
        showEmpty: false,
      },
    ],
    series: [
      {
        name: "Tide ~ m",
        //data: tideData,
        color: "#74b9ff",
        data: tideDataNew,
        yAxis: 1,
        step: false,
        accessibility: {
          exposeAsGroupOnly: true,
        },
        marker: {
          enabled: false,
          radius: 1.5,
        },
        crisp: false,
        dataGrouping: {
          enabled: false,
        },
      },
      {
        name: "Sunset",
        type: "spline",
        color: "rgba(241, 196, 15,1.0)",
        accessibility: {
          exposeAsGroupOnly: true,
        },
        marker: {
          enabled: false,
        },
        data: timeDay,
        yAxis: 1,
      },

      {
        type: "spline",
        name: "Sunrise",
        accessibility: {
          exposeAsGroupOnly: true,
        },
        color: "#2c3e50",
        yAxis: 1,
        marker: {
          enabled: false,
          symbol: "url(" + MoonEdit + ")",
        },
        data: timeNight,
        crisp: false,
      },
    ],
  };

  return (
    <div className="charts-show">
      <div className="chart__title--abs" style={{ color: "#74b9ff" }}>
        Tide&nbsp;•&nbsp;&nbsp;
        <span
          className="__title--abs-name"
          style={{ color: "rgba(241, 196, 15,1.0)" }}
        >
          Sunrire & Sunset
        </span>
      </div>
      <div className="label--hidden-brand"></div>
      <div className="chart-container">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ className: props.className }}
        />
      </div>
      {/* <div className="sunrise__sunset">
        <img src={SunEdit} alt="Hello world" />
      </div> */}
      {/* <div className="chart-container">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div> */}
    </div>
  );
};
export default Charts;
