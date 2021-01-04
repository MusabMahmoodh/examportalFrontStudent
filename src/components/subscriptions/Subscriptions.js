import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import * as api from "../../API/api";
import SubscriptionCard from "./SubscriptionCard";
import { css } from "@emotion/react";
import UserContext from "../../context/StudentContext";
const Subscriptions = () => {
  const { subscriptions, setSubscriptions, userData } = useContext(UserContext);
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
        const response = await api.fetchSubscriptions(userData.token);
        setSubscriptions(response.data[0].subscriptions);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Row>
        {console.log(subscriptions)}
        {subscriptions &&
          subscriptions.map((sub) => (
            <Col xs={12} md={4}>
              <SubscriptionCard subscription={sub} />
            </Col>
          ))}
      </Row>
      <BeatLoader loading={loading} size={24} color="green" css={override} />
    </div>
  );
};

export default Subscriptions;
