import React, { useEffect, useState, useContext } from "react";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Question from "../components/exams/Exam/Question";
import Submission from "../components/exams/Exam/Submission";
import Solution from "../components/exams/Exam/Solution";
import { css } from "@emotion/react";
import * as api from "../API/api";
import UserContext from "../context/StudentContext";

import moment from "moment";
const ExamPaper = () => {
  const { id } = useParams();
  const [exam, setExam] = useState([]);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Question">
          <Question exam={exam} />{" "}
        </Tab>
        <Tab eventKey="profile" title="Submission">
          {moment().format() < exam.end_time ? (
            <Submission ex_id={exam._id} />
          ) : (
            <Alert variant="danger">Exam has been ended</Alert>
          )}
        </Tab>
        <Tab eventKey="contact" title="Solution">
          {moment().format() > exam.end_time ? (
            <Solution exam={exam} />
          ) : (
            <Alert variant="danger">
              Solutions are not currently avaialble
            </Alert>
          )}
        </Tab>
      </Tabs>
      <BeatLoader loading={loading} size={24} color="green" css={override} />
    </>
  );
};

export default ExamPaper;
