import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Button from "@material-ui/core/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Alert from "../partials/alert";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Exam({ essays }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const timeChange = (time) => {
    return time.toLocaleString().replace("Z", "").replace("T", " ");
  };
  let history = useHistory();
  return (
    <>
      {essays.length > 0 ? (
        essays.map((ess) => (
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
            key={ess._id}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={ess.name} />
              {moment().format() < ess.start_time ? (
                <Button size="small" className={classes.margin} disabled>
                  Exam will be started soon
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => history.push(`/subscription/${ess._id}/paper`)}
                >
                  Attempt
                </Button>
              )}
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Start At :${timeChange(ess.start_time)}`}
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Ends At :${timeChange(ess.end_time)}`}
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Time preffered :${ess.interval[0].minutes} minutes`}
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText secondary={`Description :${ess.description}`} />
                </ListItem>
              </List>
            </Collapse>
          </List>
        ))
      ) : (
        <Alert type="success" message="No upcoming exams, stay with us" />
      )}
    </>
  );
}
