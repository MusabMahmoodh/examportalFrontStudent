import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import * as api from "../../API/api";
import Exam from "./Exam";
import TryQuestion from "./TryQuestion";
import UserContext from "../../context/StudentContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
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
  },
}));

export default function ExamsAndQuestions() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { userData } = useContext(UserContext);
  const [exams, setExams] = useState([]);
  const [essays, setEssays] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -4em;
  `;
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchExams(id, userData.token);
        // console.log(response.data);
        // console.log(response.data);
        setExams(response.data.reverse());
        setLoading(false);
        // setSubscriptions(response.data[0].subscriptions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setEssays(exams.filter((exam) => exam.type === true));
    setQuestions(exams.filter((exam) => exam.type === false));
  }, [exams]);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          classes={{
            indicator: classes.indicator,
          }}
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            label="Questions"
            {...a11yProps(0)}
            style={{ color: "#FA9A66" }}
          />
          <Tab
            label="Exams"
            {...a11yProps(1)}
            style={{
              color: "#FA9A66",
            }}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TryQuestion questions={questions} />{" "}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Exam essays={essays} />
      </TabPanel>
      <BeatLoader loading={loading} size={24} color="green" css={override} />
    </div>
  );
}
