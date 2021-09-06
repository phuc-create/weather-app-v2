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
const Charts = (props) => {
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
  const timeDay = dataMock.map((dt) => {
    let timeTravel = Number(dt.dt_txt.slice(0, 2));
    if (timeTravel >= 6 && timeTravel <= 18) {
      dt = {
        name: "Day",
        y: checkTimeCurve(timeTravel),
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
  const timeNight = dataMock.map((dt2) => {
    let timeTravel = Number(dt2.dt_txt.slice(0, 2));
    if (timeTravel >= 18 || timeTravel <= 6) {
      dt2 = {
        name: "Night",
        y: checkTimeCurve(timeTravel),
        color: "#30336b",
        segmentColor: "#30336b",
      };
    }

    return dt2;
  });
  const plotColors = dataMock.map((dt2) => {
    let timeTravel = Number(dt2.dt_txt.slice(0, 2));
    if (timeTravel >= 6 && timeTravel <= 18) {
      dt2 = {
        color: "red",
        value: timeTravel,
      };
    } else {
      dt2 = {
        color: "green",
        value: timeTravel,
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
      // plotBackgroundColor: plotColors ? "red" : "white",
      //   dataMock.map((dt2) => {
      //   console.log(this);
      //   let timeTravel = Number(dt2.dt_txt.slice(0, 2));
      //   if (timeTravel > 18) {
      //     return "#34495e";
      //   } else {
      //     return "#30336b";
      //   }
      // }),
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
        let timeCheker = Number(this.x.slice(0, 2));
        return `<img width='20px' height='20px' src=${
          timeCheker >= 6 && timeCheker <= 18 ? SunEdit : MoonEdit
        }/>${this.x}<br>Tide: ${this.y}m`;
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
      {
        visible: false,
        title: {
          text: "",
        },
        showEmpty: false,
      },
    ],
    // plotOptions: {
    //   series: {
    //     fillColor: {
    //       linearGradient: [0, 0, 0, 300],
    //       stops: [
    //         [0, Highcharts.getOptions().colors[0]],
    //         [
    //           1,
    //           Highcharts.color(Highcharts.getOptions().colors[0])
    //             .setOpacity(0)
    //             .get("rgba"),
    //         ],
    //       ],
    //     },
    //   },
    // },
    series: [
      {
        name: "Tide ~ m",
        //data: tideData,
        color: "#2193b0",
        data: tideDataNew,
        yAxis: 1,
        step: false,
        accessibility: {
          exposeAsGroupOnly: true,
        },
        marker: {
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
          radius: 2,
        },
        yAxis: 1,
        data: timeDay,
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
          radius: 2,
        },
        data: timeNight,
        crisp: false,
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
