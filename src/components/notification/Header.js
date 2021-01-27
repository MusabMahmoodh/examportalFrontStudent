import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
    textAlign: "center",
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          NOTIFICATIONS
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Delete your messages after you read it
        </Typography>
      </div>
    </div>
  );
};

export default Header;
