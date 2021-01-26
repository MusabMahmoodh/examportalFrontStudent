import React from "react";
import logo from "../../assets/logo.png";
const PreLoader = () => {
  return (
    <div
      style={{
        margin: "äuto",

        background: "black",
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
      </div>
    </div>
  );
};

export default PreLoader;
