import React, { useState, useContext } from "react";

import UserContext from "../../context/StudentContext.js";
import * as api from "../../API/api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import BackB from "../layout/Background";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TelegramIcon from "@material-ui/icons/Telegram";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: "1.5em",
    borderRadius: "20px",
    position: "relative",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#000",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#FA6913",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FA6913",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FA6913",
      },
    },
  },
})(TextField);
const useInputStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Login() {
  const [indexNo, setIndexNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData, setUserData, login } = useContext(UserContext);
  const classes = useStyles();

  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -4em;
  `;
  const submit = async (e) => {
    setLoading(true);
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
        setLoading(false);
        login();
      } else {
        // console.log(loginRes.data);
        setLoading(false);
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
      setLoading(false);
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
    <Container component="main" maxWidth="xs">
      <BackB />
      <CssBaseline />
      <div className={classes.paper}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            filter: "blur(1px)",
            zIndex: "-200",
            opacity: "0.5",
            borderRadius: "10px",
          }}
        ></div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <CssTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Index number"
            name="email"
            placeholder="Enter index"
            autoFocus
            value={indexNo}
            onChange={(e) => setIndexNo(e.target.value)}
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className={classes.submit}
            onClick={submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="https://t.me/joinchat/TFfuiWqnwjRWqofG"
                variant="body2"
              >
                <TelegramIcon
                  style={{
                    float: "right",
                    marginRight: "10px",
                  }}
                />
              </Link>
            </Grid>
            <Grid item>
              <small>Contact: 076 8306 127</small>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>{/* <Copyright /> */}</Box>
      <BeatLoader loading={loading} size={24} color="orange" css={override} />
    </Container>
  );
}
