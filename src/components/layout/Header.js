import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaPeriscope } from "react-icons/fa";
import AuthOptions from "../auth/AuthOptions";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/StudentContext.js";
export default function Header() {
  let history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
      sticky="top"
    >
      <Navbar.Brand onClick={() => history.push("/dashboard")}>
        <FaPeriscope style={{ marginRight: "2px" }} />
        Quiz master
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {userData.user ? (
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/scores")}>
              My scores
            </Nav.Link>
            <Nav.Link onClick={() => history.push("/dashboard")}>
              My Subscriptions
            </Nav.Link>
          </Nav>
        ) : (
          <div></div>
        )}

        <Nav>
          <Nav.Link>
            <AuthOptions />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
