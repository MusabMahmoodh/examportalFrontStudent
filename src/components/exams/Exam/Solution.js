import React from "react";
import { Card } from "react-bootstrap";
const Solution = ({ exam }) => {
  return (
    <Card>
      <Card.Img
        variant="bottom"
        src={exam.answer === undefined ? null : exam.answer.imageBase64}
      />
    </Card>
  );
};

export default Solution;
