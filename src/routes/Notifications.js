import React from "react";
import Divider from "@material-ui/core/Divider";
import Header from "../components/notification/Header";
import NotificationContainer from "../components/notification/NotificationContainer";
const SeeScores = () => {
  return (
    <div>
      <Header />
      {/* {console.log("here")} */}
      <Divider style={{ marginBottom: "20px" }} />
      <NotificationContainer />
    </div>
  );
};

export default SeeScores;
