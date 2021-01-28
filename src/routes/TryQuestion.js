import React, { useEffect, useState, useContext } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Question from "../components/exams/Exam/Question";
import AddMarks from "../components/exams/Question/AddMarks";
import Solution from "../components/exams/Exam/Solution";
import { css } from "@emotion/react";
import * as api from "../API/api";
import UserContext from "../context/StudentContext";
import timeDifferent from "../components/utils/timeDifferent";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HelpIcon from "@material-ui/icons/Help";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import BorderColorIcon from "@material-ui/icons/BorderColor";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  indicator: {
    background: "#FA9A66",
    color: "red",
  },
}));

export default function TryQuestion() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const [exam, setExam] = useState([]);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -4em;
  `;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchExam(id, userData.token);
        setExam(response.data);
        setTimeLeft(timeDifferent(response.data.end_time));
        setLoading(false);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      exam.end_time && setTimeLeft(timeDifferent(exam.end_time));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <>
      <h3>
        Time left:{"  "}
        {timeLeft}{" "}
      </h3>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            classes={{
              indicator: classes.indicator,
            }}
            aria-label="scrollable force tabs example"
          >
            <Tab
              label="Question"
              icon={
                <HelpIcon
                  style={{
                    color: "#FA9A66",
                  }}
                />
              }
              {...a11yProps(0)}
            />
            <Tab
              label="Submit marks"
              icon={
                <CloudUploadIcon
                  style={{
                    color: "#FA9A66",
                  }}
                  s
                />
              }
              {...a11yProps(1)}
            />
            <Tab
              label="Answers"
              icon={
                <BorderColorIcon
                  style={{
                    color: "#FA9A66",
                  }}
                />
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Question exam={exam} />{" "}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {moment().format() < exam.end_time ? (
            <AddMarks ex_id={exam._id} />
          ) : (
            <Alert variant="danger">Question time has been ended</Alert>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Solution exam={exam} />
        </TabPanel>
      </div>
      <BeatLoader loading={loading} size={24} color="green" css={override} />
    </>
  );
}
