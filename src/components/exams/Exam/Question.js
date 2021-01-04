import React from "react";
import { Card } from "react-bootstrap";
const Question = ({ exam }) => {
  return (
    <Card>
      <Card.Img
        variant="bottom"
        src={exam.question === undefined ? null : exam.question.imageBase64}
      />
      <Card.Body>
        <Card.Title>{exam.name}</Card.Title>
        <Card.Text>{exam.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Question;
