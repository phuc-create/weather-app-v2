import React, { useState, useEffect, useContext } from "react";
import "./Charts.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SunEdit from "../../img/sun25.png";
import MoonEdit from "../../img/moon25.png";
// import { dataWeather } from "../../apis/WeatherData";
import { dataEdit } from "../../apis/WeatherDataMock";
import bellcurve from "highcharts/modules/histogram-bellcurve";
import { checkTimeCurve, handleResizeWidth } from "../../helpers/helpers";
import { Ctx } from "../../contexts/Contexts";
bellcurve(Highcharts);
const Charts = () => {
  //IF YOU WANNA GET DATA FROM API,USING CODE IN CONTEXT
  const [dataMock, setDataMock] = useState(dataEdit);
  const { data } = useContext(Ctx);
  useEffect(() => {
    const setDataChart = () => {
      setDataMock(dataEdit);
    };
    setDataChart();
  }, []);
  const [widthChart, setWidthChart] = useState(handleResizeWidth(data.length));
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidthChart(handleResizeWidth(dataMock.length));
    });
  }, [dataMock]);
  //CUSTOM DATA OF TIDE USING NEW DATA
  const tideDataNew = dataMock.map((dt) => {
    if (Number(dt.dt_txt.slice(0, 2)) >= 12) {
      dt = {
        y: dt.main.sea_level - dt.main.grnd_level,
        name: "Day Time",
        // marker: {
        //   symbol: "url(" + Sun + ")",
        // },
      };
    } else {
      dt = {
        y: dt.main.sea_level - dt.main.grnd_level,
        name: "Night Time",
        // marker: {
        //   symbol: "url(" + Moon + ")",
        // },
      };
    }
    return dt;
  });
  //CUSTOM DATA OF TIDE USING NEW DATA
  const timeData = dataMock.map((dt) => {
    let timeTravel = Number(dt.dt_txt.slice(0, 2));
    if (timeTravel >= 6 && timeTravel <= 18) {
      dt = {
        name: "Bell test",
        y: checkTimeCurve(timeTravel),
        color: "#f9ca24",
        // marker: {
        //   symbol: "url(" + SunEdit + ")",
        // },
      };
    } else {
      dt = {
        name: "Bell test",
        y: checkTimeCurve(timeTravel),
        color: "#30336b",
        // marker: {
        //   symbol: "url(" + MoonEdit + ")",
        // },
      };
    }
    return dt;
  });

  //OPTION TO CONFIGURE CHART (REQUIRED)
  const options = {
    chart: {
      type: "areaspline",
      zoomType: "x",
      width: widthChart,
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
        // dataMock.map(function (dt) {
        //   let timeCheker = Number(dt.dt_txt.slice(0, 2));

        //   return `<img src=${
        //     timeCheker >= 6 && timeCheker <= 18 ? SunEdit : MoonEdit
        //   }/>${dt.dt_txt.slice(0, 4)}<br>Tide: ${dt.main.sea_level - dt.main.grnd_level}m`;
        // });
        let timeCheker = Number(this.x.slice(0, 2));
        return `<img width='20px' height='20px' src=${
          timeCheker >= 6 && timeCheker <= 18 ? SunEdit : MoonEdit
        }/>${this.x}<br>Tide: ${this.y}m`;
      },
      caretSize: 5,
      cornerRadius: 2,
      xPadding: 10,
      yPadding: 10,
    },
    title: {
      text: " .",
    },
    xAxis: [
      {
        crosshair: true,
        categories: dataMock.map((dt) => {
          if (Number(dt.dt_txt.slice(0, 2)) > 12) {
            return `${dt.dt_txt.slice(0, 5)}PM`;
          } else {
            return `${dt.dt_txt.slice(0, 5)}AM`;
          }
        }),
      },
      { alignTicks: false, opposite: true },
    ],
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
    ],
    plotOptions: {
      series: {
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
    },
    series: [
      {
        name: "Tide ~ m",
        //data: tideData,
        data: tideDataNew,
        yAxis: 1,
        step: true,
        accessibility: {
          exposeAsGroupOnly: true,
        },
        marker: {
          radius: 1.5,
        },
      },
      {
        name: "Sunset & Sunrise",
        color: "#f9ca24",
        accessibility: {
          exposeAsGroupOnly: true,
        },
        marker: {
          radius: 5,
        },
        yAxis: 1,
        data: timeData,
      },
    ],
  };
  return (
    <div className="charts-show">
      <div className="chart__title--abs">
        Tide•<span className="__title--abs-name">Sunrire & Sunset</span>
      </div>
      <div className="label--hidden-brand"></div>
      <div className="chart-container">
        <HighchartsReact highcharts={Highcharts} options={options} />
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
