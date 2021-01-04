import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FileBase from "react-file-base64";
import * as api from "../../../API/api";
import UserContext from "../../../context/StudentContext";
const AddMarks = ({ ex_id }) => {
  const [marks, setMarks] = useState(0);
  const { userData } = useContext(UserContext);
  const [duration, setDuration] = useState({
    hour: 0,
    minutes: 0,
  });
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const newSubmission = {
  //         submission,
  //       };
  //       const response = await api.submitAnswers(
  //         ex_id,
  //         newSubmission,
  //         userData.token
  //       );
  //       if (response.status === 201) {
  //         console.log(response.data.message);
  //       } else {
  //         console.log(response.data.message);
  //       }

  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Group>
        <Form.Label>Marks</Form.Label>
        <Form.Control
          type="number"
          placeholder="enter your marks here"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
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
            onChange={(e) => setDuration({ ...duration, hour: e.target.value })}
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
        size="lg"
        type="submit"
        // onClick={handleSubmit}
        block
      >
        Submit
      </Button>
    </Form.Group>
  );
};

export default AddMarks;
