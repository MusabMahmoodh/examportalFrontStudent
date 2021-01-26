import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import NotificationHandler from "../layout/HeaderComps/NotificationHandler";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserContext from "../../context/StudentContext.js";

export default function AuthOptions() {
  const { isAuthenticated, setUserData, logout } = useContext(UserContext);

  const history = useHistory();

  const login = () => history.push("/login");
  const logoutUser = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    logout();
    history.push("/");
  };

  return (
    <nav className="auth-options">
      {isAuthenticated ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NotificationHandler />
          <ExitToAppIcon onClick={logoutUser} />{" "}
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
