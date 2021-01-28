import React from "react";
import Footer from "../../components/layout/Footer";
const PreLoader = () => {
  return (
    <div
      style={{
        margin: "äuto",

        backgroundImage: "linear-gradient(to top,  #FA9A66 20%, #000 80%)",
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
        flexDirection: "column",
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

      <div>
        <h5
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "#EFF3CD",
          }}
        >
          V 1.0.2
        </h5>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          color: "#EFF3CD",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default PreLoader;
