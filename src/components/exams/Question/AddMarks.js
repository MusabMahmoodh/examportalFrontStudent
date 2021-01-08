import React, { useContext, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import * as api from "../../../API/api";
import UserContext from "../../../context/StudentContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import moment from "moment";
import { useHistory } from "react-router-dom";

const AddMarks = ({ ex_id, endTime }) => {
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
    <>
      <Form.Group controlId="exampleForm.ControlInput1">
        {attempted ? (
          <div>
            <h5>Already submitted</h5>
            <Form.Group>
              <Form.Label>Scores</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter your scores here"
                value={scores}
                readOnly
              />
            </Form.Group>
            <Form.Row>
              <Form.Label>Duration:</Form.Label>
              <br />
              <Form.Group>
                <Form.Label>Hours</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Hours"
                  readOnly
                  value={duration.hour}
                />
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label>Minutes</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="minutes"
                  readOnly
                  value={duration.minutes}
                />
              </Form.Group>
            </Form.Row>
          </div>
        ) : (
          <div>
            <Form.Group>
              <Form.Label>Scores</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter your scores here"
                value={scores}
                onChange={(e) => setScores(e.target.value)}
              />
            </Form.Group>
            <Form.Row>
              <Form.Label>Duration</Form.Label>
              <br />
              <Form.Group>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Hours"
                  max="8"
                  min="0"
                  value={duration.hour}
                  onChange={(e) =>
                    setDuration({ ...duration, hour: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="minutes"
                  max="100"
                  min="0"
                  value={duration.minutes}
                  onChange={(e) =>
                    setDuration({ ...duration, minutes: e.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Button
              className="secondary"
              size="sm"
              type="submit"
              onClick={handleSubmit}
              block
            >
              Submit
            </Button>
          </div>
        )}
      </Form.Group>
      <BeatLoader loading={loading} size={24} color="orange" css={override} />
    </>
  );
};

export default AddMarks;
