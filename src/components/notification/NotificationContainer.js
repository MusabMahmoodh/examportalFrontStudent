import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import * as apiNotification from "../../API/notificationApi";
import Notification from "./Notification";
import UserContext from "../../context/StudentContext";
import Alert from "../partials/alert";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function InteractiveList() {
  const classes = useStyles();
  const { notifications, setNotifications, userData } = useContext(UserContext);
  const [dense, setDense] = React.useState(false);

  const removeNotification = (id) => {
    const fetchData = async () => {
      try {
        const response = await apiNotification.updateNotifications(
          userData.user.id,
          id,
          userData.token
        );

        setNotifications(notifications.filter((notif) => notif._id !== id));
        // console.log(response);
        // console.log(response.data[0].notifications);
        // setSubscriptions(response.data[0].subscriptions.reverse());
        // setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };
  return (
    <div className={classes.root}>
      {/* {console.log(notifications)} */}
      <Grid>
        <Grid item xs={12}>
          <div className={classes.demo}>
            <List dense={dense}>
              {notifications.length > 0 ? (
                notifications
                  .reverse()
                  .map((notif) => (
                    <Notification
                      notif={notif}
                      removeNotification={removeNotification}
                      key={notif._id}
                    />
                  ))
              ) : (
                <Alert
                  type="warning"
                  message="There is no messages available"
                />
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
