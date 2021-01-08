import React, { useEffect, useState, useContext } from "react";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Question from "../components/exams/Exam/Question";
import AddMarks from "../components/exams/Question/AddMarks";
import Solution from "../components/exams/Exam/Solution";
import { css } from "@emotion/react";
import * as api from "../API/api";
import UserContext from "../context/StudentContext";
import timeDifferent from "../components/utils/timeDifferent";
import moment from "moment";

const TryQuestion = () => {
  const { id } = useParams();
  const [exam, setExam] = useState([]);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -4em;
  `;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchExam(id, userData.token);
        setExam(response.data);
        setTimeLeft(timeDifferent(response.data.end_time));
        setLoading(false);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeDifferent(exam.end_time));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <>
      <h3>
        Time left:{"  "}
        {timeLeft}{" "}
      </h3>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Question">
          <Question exam={exam} />{" "}
        </Tab>
        <Tab eventKey="profile" title="Submission">
          {moment().format() < exam.end_time ? (
            <AddMarks ex_id={exam._id} />
          ) : (
            <Alert variant="danger">Question time has been ended</Alert>
          )}
        </Tab>
        <Tab eventKey="contact" title="Solution">
          <Solution exam={exam} />
        </Tab>
      </Tabs>
      <BeatLoader loading={loading} size={24} color="green" css={override} />
    </>
  );
};

export default TryQuestion;
