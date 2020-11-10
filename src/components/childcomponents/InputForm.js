import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import PersonPinIcon from "@material-ui/icons/PersonPin";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    marginTop: theme.spacing(2),
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.dark,
  },
  form: {
    width: "50%", // Fix IE 11 issue.
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
    background: theme.palette.info.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  navlink: {
    textDecoration: "inherit",
    fontFamily: "lato",
    color: "#363130",
  },
  grid: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      borderTop: `3px solid ${theme.palette.divider}`,
    },
  },
}));
//custom css textfield
const CssTextField = withStyles({
  root: {
    width: "100%",
    "& label.Mui-focused": {
      color: "#00d138",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#00d138",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#00c7c4",
      },
      "&:hover fieldset": {
        borderColor: "#00ff95",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00d138",
      },
    },
  },
})(TextField);

export default function FindMe() {
  const classes = useStyles();
  const history = useHistory();
  const [SensorID, setSensorID] = useState("");
  const [DeviceID, setDeviceID] = useState("");
  const FindLocation = () => {
    history.push("/map/" + SensorID + "/" + DeviceID);
  };
  return (
    <div className={classes.container}>
      <div className={classes.paper}>
        {/*Top avatar of login form*/}
        <Avatar className={classes.avatar}>
          <PersonPinIcon />
        </Avatar>
        <Typography
          style={{ paddingBottom: "30px" }}
          component="h1"
          variant="h5"
        >
          Find Me
        </Typography>
        {/*input form body*/}
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField
                value={SensorID}
                label="Sensor ID"
                variant="outlined"
                onChange={(e) => setSensorID(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                value={DeviceID}
                label="Device ID"
                variant="outlined"
                onChange={(e) => setDeviceID(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={FindLocation}
              >
                Find
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
