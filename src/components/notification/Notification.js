import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function Notification({ notif, removeNotification }) {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <PersonPinIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={notif.title}
        secondary={
          <React.Fragment>
            {`${notif.body} -`}
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {notif.from}
            </Typography>
          </React.Fragment>
        }
      />

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon onClick={() => removeNotification(notif._id)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
