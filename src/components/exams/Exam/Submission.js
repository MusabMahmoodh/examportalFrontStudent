import React, { useContext, useState, useEffect } from "react";
import FileBase from "react-file-base64";
import * as api from "../../../API/api";
import UserContext from "../../../context/StudentContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "../../partials/alert";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

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

export default function Submission({ ex_id, endTime }) {
  const classes = useStyles();

  const [submission, setSubmission] = useState(null);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);
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
        submission,
      };
      const response = await api.submitAnswers(
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
          <div>
            <Alert type="success" message="Already submitted" />
          </div>
        </div>
      ) : (
        <>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="Enter time taken">
              Enter Time taken(in minutes)
            </InputLabel>
            <FileBase
              type="file"
              multiple={false}
              accept=".pdf,.jpeg,.png"
              onDone={(base64) => setSubmission(base64)}
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
              Upload
            </Button>
          </div>
        </>
      )}
      <BeatLoader loading={loading} size={24} color="orange" css={override} />
    </div>
  );
}
