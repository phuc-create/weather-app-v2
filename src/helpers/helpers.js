//PROCESS TIME DEPEND ON VALUE TIME OF DATA (CAN EDIT FOR APPROPRIATE)
export const checkTimeCurve = (time) => {
  switch (time) {
    case 6:
    case 18:
      return 0.7;
    case 8:
    case 16:
      return 3.6;
    case 10:
    case 14:
      return 6.3;
    case 12:
      return 7.5;
    default:
      return 0.7;
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
  const initSizeWidthChart = 13000;
  const initLengthItem = 47;
  const maxWidthofCurrentWindow = 1920;
  let lengthOfData = dataLength;

  let width = Math.floor((lengthOfData * initSizeWidthChart) / initLengthItem);
  width = Math.floor((innerWidth * 13000) / maxWidthofCurrentWindow);

  width = Math.floor((window.innerWidth * 13000) / maxWidthofCurrentWindow);

  return width;
};

//18001166 PHONE NUMBER OF WIFI////////////////////////////////
//SET BACKGROUND FOR NIGHT TIME
export const calculatePlots = (arrData) => {
  let plotPositions = [];
  //7 steps for 1 night
  // let timeF = [0, 2, 4, 6, 18, 20, 22];
  let from = 0,
    to = 3,
    day = 1;

  for (let i = 0; i < Math.max(arrData.length / 6) / 2 + 1; i++) {
    plotPositions.push({
      label: {
        text: `Day ${day}`,
        style: {
          color: "#34495e",
          fontFamily: "Arial, Helvetica, sans-serif;",
          fontSize: "20px",
          fontWeight: "600",
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "red",
          zIndex: 20,
        },
      },
      color: "rgba(0,0,0,0.1)",
      from: from,
      to: to,
    });
    from = to + 6;
    to = to + 12;
    day++;
  }

  return plotPositions;
};
export const objectTest = [
  {
    label: {
      text: "Day 1",
      style: {
        color: "#34495e",
        fontFamily: "Arial, Helvetica, sans-serif;",
        fontSize: "20px",
        fontWeight: "600",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "red",
        zIndex: 20,
      },
    },
    color: "rgba(0,0,0,0.1)",
    from: 0,
    to: 3,
  },
  {
    label: {
      text: "Day 2",
      style: {
        color: "#34495e",
        fontFamily: "Arial, Helvetica, sans-serif;",
        fontSize: "20px",
        fontWeight: "600",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "red",
        zIndex: 20,
      },
    },
    color: "rgba(0,0,0,0.1)",
    from: 9,
    to: 15,
  },
  {
    label: {
      text: "Day 3",
      style: {
        color: "#34495e",
        fontFamily: "Arial, Helvetica, sans-serif;",
        fontSize: "20px",
        fontWeight: "600",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "red",
        zIndex: 20,
      },
    },
    color: "rgba(0,0,0,0.1)",
    from: 21,
    to: 27,
  },
  {
    label: {
      text: "Day 4",
      style: {
        color: "#34495e",
        fontFamily: "Arial, Helvetica, sans-serif;",
        fontSize: "20px",
        fontWeight: "600",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "red",
        zIndex: 20,
      },
    },
    color: "rgba(0,0,0,0.1)",
    from: 33,
    to: 39,
  },
  {
    label: {
      text: "Day 5",
      style: {
        color: "#34495e",
        fontFamily: "Arial, Helvetica, sans-serif;",
        fontSize: "20px",
        fontWeight: "600",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "red",
        zIndex: 20,
      },
    },
    color: "rgba(0,0,0,0.1)",
    from: 45,
    to: 51,
  },
];
