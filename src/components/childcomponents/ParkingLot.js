import React, { useEffect, useState } from "react";
import { makeStyles, Grid, useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Spring } from "react-spring/renderprops";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Axios from "axios";
import qs from "qs";
import LoadingAnimation from "./LoadingAnimation";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../asset/styles.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  parkingcontainer: {
    display: "flex",
    flexDirection: "row",
    width: "1000px",
    height: "700px",
    left: "0px",
    top: "10px",
    background: "#b5e7a0",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "640px",
      height: "480px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "420px",
      height: "300px",
    },
  },
  bay: {
    position: "absolute",
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    "&:hover": {
      backgroundColor: "yellow",
    },
  },
  baytextrotate: {
    fontSize: "1em",

    transform: "rotate(-90deg)",
    webkitTransform: "rotate(-89deg)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px",
    },
  },
  baytext: {
    fontSize: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px",
    },
  },
  status: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statusrotate: {
    transform: "rotate(+90deg)",
    webkitTransform: "rotate(+89deg)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ParkingLot(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [Found, setFound] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Changing, setChanging] = useState(true);
  const [bay_id, setbay_id] = useState("");
  const [OpenSnackBar, setOpenSnackBar] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  //media query to maintain app responsive
  const matchesMD = useMediaQuery("(min-width:970px)");
  const matchesSM = useMediaQuery("(min-width:610px)");
  const matchesXS = useMediaQuery("(min-width:500px)");
  //getting data from previous view
  const DeviceID = props.match.params.DeviceID;
  //BayData
  const [BayData, setBayData] = useState([]);
  //API Call
  //getting bay data
  const getBayData = async () => {
    var data = qs.stringify({});
    var config = {
      method: "get",
      url: "http://34.71.252.163:5000/parking/lot/" + DeviceID,
      headers: {},
      data: data,
    };
    await Axios(config)
      .then(function (response) {
        setBayData(response.data);
        setFound(true);
        setLoading(false);
        setChanging(false);
      })
      .catch(function (error) {
        setFound(false);
        setLoading(false);
        setChanging(false);
        console.log(error);
      });
  };
  //changing status on click
  const changeBayStatus = async (bay_id) => {
    setChanging(true);
    setbay_id(bay_id);
    var data = qs.stringify({});
    setOpenSnackBar(true);
    var config = {
      method: "post",
      url: "http://34.71.252.163:5000/parking/bay/" + bay_id + "/toggle",
      headers: {},
      data: data,
    };
    await Axios(config)
      .then(function (response) {
        if (response.data) {
          getBayData();
        }
      })
      .catch(function (error) {
        setChanging(false);
        console.log(error);
      });
  };
  //function call
  useEffect(() => {
    getBayData();
  }, []);

  return (
    <div className={classes.container}>
      <Spring
        config={{ tension: 800, friction: 500, precision: 0.9 }}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {(props) => (
          <div style={props}>
            <h1>PARKING LOT</h1>
          </div>
        )}
      </Spring>
      Click on Location to Change Status
      {Loading ? <LoadingAnimation /> : ""}
      {Found ? (
        <Grid container className={classes.parkingcontainer}>
          {BayData.map((bay) => {
            //Three media queries are used to fit fixed sized div maintaining aspect ratio
            if (
              //media-query for screen > md
              `${matchesMD}` === "true" &&
              `${matchesSM}` === "true" &&
              `${matchesXS}` === "true"
            ) {
              return (
                <div
                  id="bay"
                  key={bay.id}
                  //   className={classes.bay}
                  style={{
                    //maintaining aspect ratio for all screens
                    left: bay.x,
                    top: bay.y,
                    backgroundColor: bay.active
                      ? theme.palette.error.main
                      : theme.palette.success.dark,
                    height: bay.height,
                    width: bay.width,
                  }}
                  onClick={(e) => changeBayStatus(bay.id)}
                >
                  {Changing ? (
                    <div
                      className={
                        bay.width > bay.height
                          ? classes.baytextrotate
                          : classes.baytext
                      }
                    >
                      <CircularProgress />
                    </div>
                  ) : (
                    <div
                      className={
                        //rotate to fit texts in horizontal div
                        bay.width > bay.height
                          ? classes.baytextrotate
                          : classes.baytext
                      }
                    >
                      {bay.active ? (
                        <div
                          className={
                            bay.width > bay.height
                              ? classes.statusrotate
                              : classes.status
                          }
                        >
                          <HighlightOffIcon />
                          Occupied
                        </div>
                      ) : (
                        <div
                          className={
                            bay.width > bay.height
                              ? classes.statusrotate
                              : classes.status
                          }
                        >
                          <CheckCircleOutlineIcon />
                          Free
                        </div>
                      )}
                      <br />
                      H:{bay.height}
                      <br /> W:{bay.width}
                      <br />
                      X:{bay.x} <br /> Y:{bay.y}
                    </div>
                  )}
                </div>
              );
            } else if (
              //media-query for screen > sm
              `${matchesMD}` === "false" &&
              `${matchesSM}` === "true" &&
              `${matchesXS}` === "true"
            ) {
              return (
                <div
                  id="bay"
                  key={bay.id}
                  //   className={classes.bay}
                  style={{
                    //maintaining aspect ratio for all screens
                    left: bay.x / 1.5,
                    top: bay.y / 1.5,
                    backgroundColor: bay.active
                      ? theme.palette.error.main
                      : theme.palette.success.dark,
                    height: bay.height / 1.5,
                    width: bay.width / 1.5,
                  }}
                  onClick={(e) => changeBayStatus(bay.id)}
                >
                  {Changing ? (
                    <div
                      className={
                        bay.width > bay.height
                          ? classes.baytextrotate
                          : classes.baytext
                      }
                    >
                      <CircularProgress />
                    </div>
                  ) : (
                    <div
                      className={
                        //rotate to fit texts in horizontal div
                        bay.width > bay.height
                          ? classes.baytextrotate
                          : classes.baytext
                      }
                    >
                      {bay.active ? (
                        <div
                          className={
                            bay.width > bay.height
                              ? classes.statusrotate
                              : classes.status
                          }
                        >
                          <HighlightOffIcon />
                          Occupied
                        </div>
                      ) : (
                        <div
                          className={
                            bay.width > bay.height
                              ? classes.statusrotate
                              : classes.status
                          }
                        >
                          <CheckCircleOutlineIcon />
                          Free
                        </div>
                      )}
                      <br />
                      H:{bay.height}
                      <br /> W:{bay.width}
                      <br />
                      X:{bay.x} <br /> Y:{bay.y}
                    </div>
                  )}
                </div>
              );
            } else {
              //media-query for screen > xs
              return (
                <div
                  id="bay"
                  key={bay.id}
                  //   className={classes.bay}
                  style={{
                    //maintaining aspect ratio for all screens
                    left: bay.x / 2.5,
                    top: bay.y / 2.5,
                    backgroundColor: bay.active
                      ? theme.palette.error.main
                      : theme.palette.success.dark,
                    height: bay.height / 2,
                    width: bay.width / 2,
                  }}
                  onClick={(e) => changeBayStatus(bay.id)}
                >
                  {Changing ? (
                    <div
                      className={
                        bay.width > bay.height
                          ? classes.baytextrotate
                          : classes.baytext
                      }
                    >
                      <div
                        className={
                          bay.width > bay.height
                            ? classes.baytextrotate
                            : classes.baytext
                        }
                      >
                        <CircularProgress />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={
                        //rotate to fit texts in horizontal div
                        bay.width > bay.height
                          ? classes.baytextrotate
                          : classes.baytext
                      }
                    >
                      {bay.active ? (
                        <div
                          className={
                            bay.width > bay.height
                              ? classes.statusrotate
                              : classes.status
                          }
                        >
                          <HighlightOffIcon />
                          Occupied
                        </div>
                      ) : (
                        <div
                          className={
                            bay.width > bay.height
                              ? classes.statusrotate
                              : classes.status
                          }
                        >
                          <CheckCircleOutlineIcon />
                          Free
                        </div>
                      )}
                      <br />
                      H:{bay.height}
                      <br /> W:{bay.width}
                      <br />
                      X:{bay.x} <br /> Y:{bay.y}
                    </div>
                  )}
                </div>
              );
            }
          })}
          <Snackbar
            open={OpenSnackBar}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Status Updated for Bay: {bay_id}
            </Alert>
          </Snackbar>
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
}
