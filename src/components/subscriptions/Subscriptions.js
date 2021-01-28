import React, { useEffect, useContext, useState } from "react";

import { BeatLoader } from "react-spinners";
import * as api from "../../API/api";
import SubscriptionCard from "./SubscriptionCard";
import { css } from "@emotion/react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import UserContext from "../../context/StudentContext";
import colorChange from "../utils/randomColor";
import Alert from "../partials/alert";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
const Subscriptions = () => {
  const { subscriptions, setSubscriptions, userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -4em;
  `;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchSubscriptions(userData.token);
        setSubscriptions(response.data[0].subscriptions.reverse());
        setLoading(false);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={classes.root} style={{ marginBottom: "30px" }}>
      <Grid container spacing={3}>
        {/* {console.log(subscriptions)} */}

        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <Grid item xs={12} sm={6} key={sub._id}>
              <SubscriptionCard
                subscription={sub}
                colorChange={() => colorChange}
              />
            </Grid>
          ))
        ) : (
          <Alert
            type="warning"
            message="You have not enrolled to any exams yet"
          />
        )}
      </Grid>
      <BeatLoader loading={loading} size={24} color="green" css={override} />
    </div>
  );
};

export default Subscriptions;
