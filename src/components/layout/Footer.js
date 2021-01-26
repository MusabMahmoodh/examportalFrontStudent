import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
const Footer = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "-25px",
        left: "0",
        right: "0",
        border: "solid black 2px",
        margin: "0",
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://t.me/joinchat/TFfuiWqnwjRWqofG ">
          Quiz masters
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

export default Footer;
