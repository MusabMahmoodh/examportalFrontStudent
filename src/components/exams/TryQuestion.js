import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";

const TryQuestion = ({ questions }) => {
  const timeChange = (time) => {
    return time.toLocaleString().replace("Z", "").replace("T", " ");
  };
  let history = useHistory();

  return (
    <>
      {questions &&
        questions.map((ess) => (
          <Card key={ess._id}>
            <Card.Header>{ess.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                Start time :{timeChange(ess.start_time)}
                <br /> End time: {timeChange(ess.end_time)} <br />
                Prefered Duration: {ess.interval[0].hour}hours{" "}
                {ess.interval[0].minutes}
                minutes
              </Card.Text>
              <Card.Title>{ess.description}</Card.Title>
              {moment().format() < ess.start_time ? (
                <Button variant="danger" disabled>
                  Question will be posted soon
                </Button>
              ) : (
                <Button
                  variant="warning"
                  onClick={() =>
                    history.push(`/subscription/${ess._id}/question`)
                  }
                >
                  Attempt
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default TryQuestion;
