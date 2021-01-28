import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import LensIcon from "@material-ui/icons/Lens";
import Button from "@material-ui/core/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Alert from "../partials/alert";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

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

export default function TryQuestion({ questions }) {
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
      {questions.length > 0 ? (
        questions.map((ess) => (
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <LensIcon />
              </ListItemIcon>
              <ListItemText primary={ess.name} />
              {moment().format() < ess.start_time ? (
                <Button size="small" className={classes.margin} disabled>
                  Question will be posted soon
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={() =>
                    history.push(`/subscription/${ess._id}/question`)
                  }
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
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Start At :${timeChange(ess.start_time)}`}
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Ends At :${timeChange(ess.end_time)}`}
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Time preffered :${ess.interval[0].minutes} minutes`}
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText secondary={`Description :${ess.description}`} />
                </ListItem>
              </List>
            </Collapse>
          </List>
        ))
      ) : (
        <Alert
          type="success"
          message="We will upload questions soon, stay with us"
        />
      )}
    </>
  );
}
