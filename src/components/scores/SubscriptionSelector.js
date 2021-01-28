import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SubscriptionSelector({
  subscriptions,
  setSelectedSubscription,
  selectedSubscription,
}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Select Subject
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={selectedSubscription}
          onChange={(e) => setSelectedSubscription(e.target.value)}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Select subscription</em>
          </MenuItem>
          {subscriptions &&
            subscriptions.map((sub) => (
              <MenuItem value={sub._id} key={sub._id}>
                {sub.name}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>Select unit/exam</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} disabled>
        <InputLabel id="demo-simple-select-disabled-label">
          Pure/Applied
        </InputLabel>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        </Select>
        <FormHelperText>Not available now</FormHelperText>
      </FormControl>
    </div>
  );
}
