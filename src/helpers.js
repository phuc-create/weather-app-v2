import Sun from "../src/img/sun30.png";
import Moon from "../src/img/moon30.png";
//CUSTOM DATA OF TIME USING NEW DATA

export const timeData = (data) =>
  data.map((dt) => {
    if (dt && Number(dt.dt_txt.slice(0, 2)) <= 12) {
      dt = {
        name: "Bell test",
        y: dt.dt_txt,
        marker: {
          symbol: "url(" + Sun + ")",
        },
      };
    } else {
      dt = {
        name: "Bell test",
        y: dt.dt_txt,
        marker: {
          symbol: "url(" + Moon + ")",
        },
      };
    }
    return dt;
  });

//CUSTOM DATA OF TIDE USING NEW DATA
export const tideDataNew = (data) =>
  data.map((dt) => {
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

//PROCESS TIME DEPEND ON VALUE TIME OF DATA (CAN EDIT FOR APPROPRIATE)
export const checkTimeCurve = (time) => {
  switch (time) {
    case 6:
    case 18:
      return 2.5;
    case 8:
    case 16:
      return 4.2;
    case 10:
    case 14:
      return 5.8;
    case 12:
      return 6.5;

    default:
      return 0.5;
  }
};
export const handleResizeWidth = (dataLength) => {
  //DEPEND ON VALUE
  //47 single data for 11000 width
  //20 single data for ????? width => 20 * 11000 / 47 = Math.floor(4680)
  //DEPEND ON RESIZE OF WIDTH
  //1903 WIDTH FOR 47 VALUE AND CURRENT WIDTH 11000
  //1000 WIDTH FOR 47 VALUE AND CURRENT WIDTH = 1000 * 11000 /1903 = Math.floor(5780)
  const { innerWidth } = window;
  const initSizeWidthChart = 11000;
  const initLengthItem = 47;
  const maxWidthofCurrentWindow = 1920;
  let lengthOfData = dataLength;

  let width = Math.floor((lengthOfData * initSizeWidthChart) / initLengthItem);
  width = Math.floor((innerWidth * 11000) / maxWidthofCurrentWindow);
  window.addEventListener("resize", () => {
    width = Math.floor((window.innerWidth * 11000) / maxWidthofCurrentWindow);
  });

  return width;
};

//18001166 PHONE NUMBER OF WIFI////////////////////////////////
