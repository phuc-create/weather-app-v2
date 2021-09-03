import React from "react";
import "./Header.scss";
import { BiBell, BiChevronDown, BiMenuAltLeft } from "react-icons/bi";
import Temporature from "../../img/thermometer.png";
import Humidity from "../../img/humidity.png";
import { AnimationCloudy, AnimationRainny } from "../Animations/AnimationCloud";

const Header = () => {
  return (
    <div>
      <header className="header">
        <BiMenuAltLeft className="header__menu biIcon" />
        <div className="header__wrap">
          <div className="header__logo">myENV</div>
          <div className="header__dropdown">
            Current Location&nbsp;
            <BiChevronDown className="dropdownBtn" />
          </div>
        </div>
        <BiBell className="header__notification biIcon" />
      </header>
      <WeatherSummary status="Clouds" />
      <WeatherDetails />
    </div>
  );
};

export default Header;

const WeatherSummary = ({ status }) => {
  return (
    <section className="weatherSummary" data-testid="weather-summary">
      <div className="weather__smBox">
        <section className="weather__illustration">
          {/* IF YOU WANNA IMAGE NOT HAVE ANIMATION ,UNCOMMENT CODE BELOW */}
          {/* <img
            className="weather__image-show"
            src={Cloudy}
            alt="Weather Summary Ilustration"
          /> */}
          {status === "Clouds" ? <AnimationCloudy /> : <AnimationRainny />}
        </section>
        <section className="weather__expression">
          <div className="weather__view">Cloudy</div>
          <div className="weather__params">
            <span className="__param--infor temp">
              <img className="temp__icon" src={Temporature} alt="Temporature" />{" "}
              38.0°C
            </span>
            <span className="__param--infor humidity">
              <img className="humid__icon" src={Humidity} alt="Humidity" /> 35%
            </span>
          </div>
        </section>
      </div>
    </section>
  );
};
const WeatherDetails = () => {
  return (
    <section className="weather__details" data-testid="weather-details">
      <div className="dtls">
        <span className="dtls--title">PSI</span>
        <span className="dtls--real psi-show">25</span>
        <span className="dtls--status">Good</span>
      </div>
      <div className="dtls">
        <span className="dtls--title">RAIN</span>
        <span className="dtls--real">0</span>
        <span className="dtls--status">mm</span>
      </div>
      <div className="dtls">
        <span className="dtls--title">DENGUE</span>
        <span className="dtls--dengue"></span>
      </div>
      <div className="dtls disable-before">
        <span className="dtls--circle"></span>
        <span className="dtls--title last-child">Add</span>
      </div>
    </section>
  );
};
