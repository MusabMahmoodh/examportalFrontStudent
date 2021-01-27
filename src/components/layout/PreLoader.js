import React from "react";
import logo from "../../assets/logo.png";
import wave from "../../assets/wave-mid-min.png";
const PreLoader = () => {
  return (
    <div
      style={{
        margin: "äuto",

        background: "#424242",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <img className="App-logo-pre" src={logo} alt="logo" />

        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "white",
          }}
        >
          QUIZ MASTERS
        </h2>
        <img
          src={wave}
          alt="wave"
          style={{ position: "absolute", bottom: "0" }}
        />
      </div>
    </div>
  );
};

export default PreLoader;
