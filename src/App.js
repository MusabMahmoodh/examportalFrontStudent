import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute.js";
import * as api from "./API/api.js";
import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import Header from "./components/layout/Header";
import Container from "@material-ui/core/Container";
import Subscription from "./routes/Subscription";
import ExamPaper from "./routes/ExamPaper";
import Dashboard from "./routes/Dashboard";
import TryQuestion from "./routes/TryQuestion";
import SeeScores from "./routes/SeeScores";
import Notifications from "./routes/Notifications";

import Login from "./components/auth/Login";
import PreLoader from "./components/layout/PreLoader";

import UserContext from "./context/StudentContext.js";
toast.configure();

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [notifications, setNotifications] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -4em;
  `;
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
        setIsRender(true);
      } else {
        const tokenRes = await api.validate(token);
        // console.log(tokenRes);
        if (tokenRes.data) {
          const userRes = await api.fetchStudent(token);
          // console.log(userRes);
          setUserData({
            token,
            user: userRes.data._id,
          });

          login();
        }
        setIsRender(true);
      }
    };

    checkLoggedIn();
    // const timer = setTimeout(() => {
    //   setIsRender(true);
    // }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isRender ? (
        <Router>
          {isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />}
          <UserContext.Provider
            value={{
              userData,
              setUserData,
              logout,
              isAuthenticated,
              subscriptions,
              setSubscriptions,
              login,
              notifications,
              setNotifications,
            }}
          >
            <Header />

            <Container
              maxWidth="sm"
              style={{
                marginTop: "100px",
              }}
            >
              <Switch>
                {/* First route */}
                {/* {console.log("render")} */}
                <Route path="/" exact>
                  {isAuthenticated ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <div>
                      <Redirect to="/login" />
                    </div>
                  )}
                </Route>
                {/* Protected routes */}
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  path="/dashboard"
                  logout={logout}
                  component={Dashboard}
                />
                <ProtectedRoute
                  exact
                  isAuthenticated={isAuthenticated}
                  path="/scores"
                  logout={logout}
                  component={SeeScores}
                />

                <ProtectedRoute
                  exact
                  isAuthenticated={isAuthenticated}
                  path="/notifications"
                  logout={logout}
                  component={Notifications}
                />
                <ProtectedRoute
                  exact
                  isAuthenticated={isAuthenticated}
                  path="/subscription/:id/paper"
                  logout={logout}
                  component={ExamPaper}
                />
                <ProtectedRoute
                  exact
                  isAuthenticated={isAuthenticated}
                  path="/subscription/:id/question"
                  logout={logout}
                  component={TryQuestion}
                />
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  path="/subscription/:id"
                  logout={logout}
                  component={Subscription}
                />

                {/* Non exist */}
                {/* <Route path="/dashboard" component={Home} /> */}
                <Route path="/login" component={Login} />

                <Route path="*">
                  <div>404 Not found </div>
                </Route>
              </Switch>
            </Container>
          </UserContext.Provider>
          {/* <Footer /> */}
        </Router>
      ) : (
        <PreLoader />
      )}
      <PropagateLoader
        loading={loading}
        size={24}
        color="orange"
        css={override}
      />
    </>
  );
}
