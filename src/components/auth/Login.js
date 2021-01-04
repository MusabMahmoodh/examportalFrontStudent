import React, { useState, useContext } from "react";

import { Form, Button, Card } from "react-bootstrap";
import UserContext from "../../context/StudentContext.js";
import * as api from "../../API/api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [indexNo, setIndexNo] = useState("");
  const [password, setPassword] = useState("");

  const { userData, setUserData, login } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { indexNo, password };
      const loginRes = await api.login(loginUser);
      setUserData({
        ...userData,
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      if (loginRes.status === 200) {
        localStorage.setItem("auth-token", loginRes.data.token);
        login();
      } else {
        console.log(loginRes.data);
        toast.error(loginRes.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.error("user not found or invalid credentials", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="container">
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Index number </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter index"
                value={indexNo}
                onChange={(e) => setIndexNo(e.target.value)}
              />
              <Form.Text className="text-muted">hmmm</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
