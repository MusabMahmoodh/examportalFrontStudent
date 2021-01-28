import React, { useContext, useState, useEffect } from "react";
import * as api from "../../../API/api";
import UserContext from "../../../context/StudentContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Alert from "../../partials/alert";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(6),
  },
}));

export default function AddMarks({ ex_id, endTime }) {
  const classes = useStyles();
  const [scores, setScores] = useState(0);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [attempted, setAttempted] = useState(false);
  const [duration, setDuration] = useState({
    hour: 0,
    minutes: 0,
  });
  let history = useHistory();
  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -4em;
  `;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.examAttemptReq(ex_id, userData.token);
        // console.log(response);
        if (response.data.isAttempted) {
          setAttempted(true);
          setScores(response.data.submission.score);
          setDuration({
            hour: response.data.submission.timeTaken[0].hour,
            minutes: response.data.submission.timeTaken[0].minutes,
          });
        }

        setLoading(false);
        // setSubscriptions(response.data[0].subscriptions);
      } catch (error) {
        setLoading(false);
        return <h1>Network error</h1>;
      }
    };
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moment().format() > endTime) {
      toast.success("Time is over", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
      });
      history.push("/dashboard");
    }
    setLoading(true);
    try {
      const newSubmission = {
        score: scores,
        interval: duration,
      };
      const response = await api.submitScores(
        ex_id,
        newSubmission,
        userData.token
      );
      setLoading(false);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
        });
        history.push("/dashboard");
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
        });
      }

      // console.log(response);
    } catch (error) {
      toast.error("submission failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      {attempted ? (
        <div>
          <Alert type="success" message="Already submitted" />
        </div>
      ) : (
        <>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="Enter marks">Enter marks</InputLabel>
            <Input
              type="number"
              id="input-with-icon-adornment"
              value={scores}
              onChange={(e) => setScores(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="Enter time taken">
              Enter Time taken(in minutes)
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              type="number"
              max="100"
              min="0"
              value={duration.minutes}
              onChange={(e) =>
                setDuration({ ...duration, minutes: e.target.value })
              }
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <div>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<SaveIcon />}
              type="submit"
              onClick={handleSubmit}
              style={{
                float: "right",
              }}
            >
              Save
            </Button>
          </div>
        </>
      )}
      <BeatLoader loading={loading} size={24} color="orange" css={override} />
    </div>
  );
}
