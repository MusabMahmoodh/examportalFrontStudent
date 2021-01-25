import React from "react";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TimelineIcon from "@material-ui/icons/Timeline";

import Typography from "@material-ui/core/Typography";
import ForwardIcon from "@material-ui/icons/Forward";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const useStylesButtons = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.01),
    },
  },
}));
function colorChange() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
const SubscriptionCard = ({ subscription }) => {
  let history = useHistory();
  const classes = useStyles();
  const btnClasses = useStylesButtons();
  return (
    <Card className={classes.root} style={{ margin: "auto" }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/random/400x100"
          title="Question"
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              width: "100%",
              background: `${colorChange()}`,
            }}
          ></div>
        </CardMedia>
      </CardActionArea>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {subscription.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <div
          className={btnClasses.root}
          style={{
            float: "right",
            width: "100%",
            margin: "0",
          }}
        >
          <div
            style={{
              float: "right",
              margin: "0",
            }}
          >
            <IconButton aria-label="progress">
              <TimelineIcon />
            </IconButton>
            <IconButton aria-label="mark">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              aria-label="go"
              color="primary"
              onClick={() => history.push(`/subscription/${subscription._id}`)}
            >
              <ForwardIcon />
            </IconButton>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

export default SubscriptionCard;
