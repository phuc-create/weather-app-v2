//GET IMAGES FROM CLOUDY FOLDER
import Cloud1 from "../../img/CloudyAnimation/cloud1.png";
import Cloud2 from "../../img/CloudyAnimation/cloud2.png";
import Sun from "../../img/CloudyAnimation/sun.png";
//GET IMAGES FROM RAINNY FOLDER
import CloudRain from "../../img/RainnyAnimation/cloud.png";
import Tick from "../../img/RainnyAnimation/tick1.png";
import Tick2 from "../../img/RainnyAnimation/tick2.png";
import "./Animation.scss";
export const AnimationCloudy = () => {
  return (
    <div className="animate__cloud" data-testid="cloudy-display">
      <img
        className="animate__cloud--cloud1"
        src={Cloud1}
        alt="Animation Cloudy Status"
      />
      <img
        className="animate__cloud--cloud1-s1"
        src={Cloud1}
        alt="Animation Cloudy Status"
      />
      <img
        className="animate__cloud--cloud2"
        src={Cloud2}
        alt="Animation Cloudy Status"
      />
      <img
        className="animate__cloud--cloud2-s2"
        src={Cloud2}
        alt="Animation Cloudy Status"
      />
      <img className="animate__sun" src={Sun} alt="Animation Cloudy Status" />
      <div className="testing-component"></div>
    </div>
  );
};
export const AnimationRainny = () => {
  return (
    <div className="rainny" data-testid="rainy-display">
      <img
        className="rainny__cloud"
        src={CloudRain}
        alt="Animation Cloudy Status"
      />
      <img className="rainny__tick" src={Tick} alt="Animation Cloudy Status" />
      <img
        className="rainny__tick2"
        src={Tick2}
        alt="Animation Cloudy Status"
      />
    </div>
  );
};
