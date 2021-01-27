import React, { useEffect, useContext, useState } from "react";

import { BeatLoader } from "react-spinners";
import * as api from "../../API/api";
import ScoreCard from "../scores/ScoreCard";
import SubscriptionSelector from "../scores/SubscriptionSelector";
import Summary from "./Summary.js";
import { css } from "@emotion/react";
import UserContext from "../../context/StudentContext";
const Scores = () => {
  const { subscriptions, setSubscriptions, userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [marks, setMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState("0");
  const [totalMarks, setTotalMarks] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -4em;
  `;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.seeMarks(userData.token);
        setMarks(response.data);
        const responseB = await api.fetchSubscriptions(userData.token);
        setSubscriptions(responseB.data[0].subscriptions);

        setLoading(false);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedSection(
      marks.filter((mark) => mark.exam.subscription === selectedSubscription)
    );
    setTotalMarks(0);
    setTotalTime(0);
    setTotalQuestions(0);
    marks
      .filter((mark) => mark.exam.subscription === selectedSubscription)
      .forEach((e) => {
        setTotalMarks((pre) => pre + parseInt(e.score));
        setTotalTime((pre) => pre + parseInt(e.timeTaken[0].minutes));
        setTotalQuestions((pre) => pre + 1);
      });
  }, [selectedSubscription]);
  return (
    <div>
      <SubscriptionSelector
        selectedSubscription={selectedSubscription}
        setSelectedSubscription={setSelectedSubscription}
        subscriptions={subscriptions}
      />
      <Summary
        totalMarks={totalMarks}
        totalTime={totalTime}
        totalQuestions={totalQuestions}
      />

      <ScoreCard selectedSection={selectedSection} />
      <BeatLoader loading={loading} size={24} color="green" css={override} />
    </div>
  );
};

export default Scores;
