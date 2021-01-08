import React from "react";
import { ListGroup, Card, Accordion, Button } from "react-bootstrap";

const Summary = ({ totalMarks, totalTime, totalQuestions }) => {
  return (
    <Accordion
      style={{
        marginBottom: "10px",
      }}
    >
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="secondary" eventKey="1">
            Click here to see summary
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <ListGroup as="ul">
            <ListGroup.Item as="li" variant="info">
              Total marks ={totalMarks}
            </ListGroup.Item>
            <ListGroup.Item as="li" variant="info">
              Average marks = {totalMarks / totalQuestions}
            </ListGroup.Item>
            <ListGroup.Item as="li" variant="info">
              Total time taken = {totalTime} minutes
            </ListGroup.Item>
            <ListGroup.Item as="li" variant="info">
              Average time = {totalTime / totalQuestions} minutes per question
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Summary;
