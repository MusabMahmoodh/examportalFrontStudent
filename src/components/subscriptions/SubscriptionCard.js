import React from "react";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
function colorChange() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
const SubscriptionCard = ({ subscription }) => {
  let history = useHistory();
  const classes = useStyles();
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
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/subscription/${subscription._id}`)}
        >
          Go
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubscriptionCard;
