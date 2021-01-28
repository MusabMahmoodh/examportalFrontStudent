import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
const Footer = () => {
  return (
    <div>
      <Typography variant="body2" color="default" align="center">
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
