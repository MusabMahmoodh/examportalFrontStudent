import React from "react";
import waveTop from "../../assets/wave-top-min.png";
import waveMid from "../../assets/wave-mid-min.png";
import waveBot from "../../assets/wave-bot-min.png";
const Background = () => {
  return (
    <div className="waveWrapper waveAnimation">
      <div className="waveWrapperInner bgTop">
        <div
          className="wave waveTop"
          style={{
            backgroundImage: "url(" + waveTop + ")",
          }}
        ></div>
      </div>
      <div className="waveWrapperInner bgMiddle">
        <div
          className="wave waveMiddle"
          style={{
            backgroundImage: "url(" + waveMid + ")",
          }}
        ></div>
      </div>
      <div className="waveWrapperInner bgBottom">
        <div
          className="wave waveBottom"
          style={{
            backgroundImage: "url(" + waveBot + ")",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Background;
