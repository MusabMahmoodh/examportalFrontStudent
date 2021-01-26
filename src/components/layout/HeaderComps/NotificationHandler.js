import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function NotificationHandler() {
  const classes = useStyles();
  const [notifications, setNotifications] = useState(["mm"]);

  return (
    <div className={classes.root}>
      <Badge color="secondary" badgeContent={notifications.length}>
        <MailIcon style={{ color: "white" }} />
      </Badge>
    </div>
  );
}
