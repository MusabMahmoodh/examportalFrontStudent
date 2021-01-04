import React, { useEffect, useState, useContext } from "react";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Question from "../components/exams/Exam/Question";
import AddMarks from "../components/exams/Question/AddMarks";
import Solution from "../components/exams/Exam/Solution";
import * as api from "../API/api";
import UserContext from "../context/StudentContext";

import moment from "moment";
const TryQuestion = () => {
  const { id } = useParams();
  const [exam, setExam] = useState([]);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchExam(id, userData.token);
        setExam(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
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
  );
};

export default TryQuestion;
