import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FileBase from "react-file-base64";
import * as api from "../../../API/api";
import UserContext from "../../../context/StudentContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const Submission = ({ ex_id }) => {
  const [submission, setSubmission] = useState(null);
  const { userData } = useContext(UserContext);
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSubmission = {
        submission,
      };
      const response = await api.submitAnswers(
        ex_id,
        newSubmission,
        userData.token
      );
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
        });
        history.push("/dashboard");
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
        });
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Submit your answers</Form.Label>
      <br />
      <FileBase
        type="file"
        multiple={false}
        accept=".pdf,.jpeg,.png"
        onDone={(base64) => setSubmission(base64)}
      />
      <Button
        className="secondary"
        size="lg"
        type="submit"
        onClick={handleSubmit}
        block
      >
        Submit
      </Button>
    </Form.Group>
  );
};

export default Submission;
