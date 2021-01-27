import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/StudentContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function NotificationHandler() {
  const classes = useStyles();
  const { notifications } = useContext(UserContext);
  let history = useHistory();

  return (
    <div
      className={classes.root}
      onClick={() => history.push("/notifications")}
    >
      <Badge color="secondary" badgeContent={notifications.length}>
        <MailIcon style={{ color: "white" }} />
      </Badge>
    </div>
  );
}
