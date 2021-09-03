# WEATHER APP V2

[![N|Solid](https://cdn.shopify.com/app-store/listing_images/eca0571692b479a33a3575370a411366/banner/CLeL47n0lu8CEAE=.jpg)](https://google.com)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](http://weather-app-v2-two.vercel.app/)

# USED FOR MULTIPLE TYPE OF JSON

- required : timestamp or date-time, sea level and
  grnd_level or tide

# JSON TYPE 1:

```
{
    list: [
      {
        dt: 1630314000,
        main: {
          temp: 27.72,
          feels_like: 31.55,
          temp_min: 27.72,
          temp_max: 28.88,
          pressure: 1008,
          sea_level: 1008,
          grnd_level: 1005,
          humidity: 81,
          temp_kf: -1.16,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        clouds: {
          all: 40,
        },
        wind: {
          speed: 5.3,
          deg: 183,
          gust: 5.85,
        },
        visibility: 10000,
        pop: 0.31,
        sys: {
          pod: "d",
        },
        dt_txt: "2021-08-30 09:00:00",
      },
      ...
}
```

# JSON TYPE 2:

```
[
    {
    main: {
      temp: 27.72,
      sea_level: 1008,
      grnd_level: 1005,
      humidity: 81,
      time: 1,
    },
    dt_txt: "00:00:00",
  },
  {
    main: {
      temp: 26.44,

      sea_level: 1006,
      grnd_level: 1005,
      humidity: 80,
      time: 1,
    },

    dt_txt: "02:00:00",
  },
  ...
]
```

# JSON TYPE 3:

```
{
    Call data from api and adjust parameters in base code to appropriate values
}
```

# Running code on local

First Step:

```sh
git clone https://github.com/phuc-create/weather-app-v2.git
```

Second Step:

```sh
cd weather-app-v2
yarn install
```

Third Step:

```sh
yarn start
```

```sh
localhost:3000
```

## REACT HOOK USED

Follow new version of REACT:

- [ReactJS] - Libraries to create UI!
- useState
- useEffect
- useCallback
- useContext
- useReducer

## AUTO FORMAT WIDTH FOLLOW RESIZE SCREEN

```js
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
```

## FORMAT TIMESTAMP (adjustment on data is required)

```js
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
```

## CHARTS

## Load Highcharts as an ES6 module

Since Highcharts supports CommonJS, it can be loaded as an ES6 module with the use of transpilers. Two common transpilers are [Babel](https://babeljs.io/) and [TypeScript](https://www.typescriptlang.org/). These have different interpretations of a CommonJS module, which affects your syntax.
_The following examples presumes you are using npm to install Highcharts, see [Download and install Highcharts](#download-and-install-highcharts) for more details._

### Babel

```js
import Highcharts from "highcharts";
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import Exporting from "highcharts/modules/exporting";
// Initialize exporting module.
Exporting(Highcharts);

// Generate the chart
Highcharts.chart("container", {
  // options - see https://api.highcharts.com/highcharts
});
```

## CUSTOM HIGHCHARTS

```js
export const tideDataNew = (data) =>
  data.map((dt) => {
    if (Number(dt.dt_txt.slice(0, 2)) >= 12) {
      dt = {
        y: dt.main.sea_level - dt.main.grnd_level,
        name: "Day Time",
      };
    } else {
      dt = {
        y: dt.main.sea_level - dt.main.grnd_level,
        name: "Night Time",
      };
    }
    return dt;
  });
```

## License

NGUYEN HUU PHUC

**Free Code, Let check it!**
