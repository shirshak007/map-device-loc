import React, { useEffect, useState } from "react";
import { makeStyles, Grid, useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Axios from "axios";
import qs from "qs";
import LoadingAnimation from "./LoadingAnimation";
import "../../asset/styles.css";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
}));

export default function ParkingLot(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [Found, setFound] = useState(false);
  const [Loading, setLoading] = useState(true);
  const matchesMD = useMediaQuery("(min-width:970px)");
  const matchesSM = useMediaQuery("(min-width:610px)");
  const matchesXS = useMediaQuery("(min-width:500px)");
  //getting data from previous view
  const DeviceID = props.match.params.DeviceID;
  //BayData
  const [BayData, setBayData] = useState([]);
  //API Call
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
      })
      .catch(function (error) {
        setFound(false);
        setLoading(false);
        console.log(error);
      });
  };
  //changing status on click
  const changeBayStatus = async (bay_id) => {
    setLoading(true);
    var data = qs.stringify({});
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
          setLoading(false);
        }
      })
      .catch(function (error) {
        setFound(false);
        setLoading(false);
        console.log(error);
      });
  };
  //function call
  useEffect(() => {
    getBayData();
  }, []);
  console.log(BayData);
  return (
    <div className={classes.container}>
      <h1>Parking Lot</h1>
      Click on location to Change Status
      {Loading ? <LoadingAnimation /> : ""}
      {Found ? (
        <Grid container className={classes.parkingcontainer}>
          {BayData.map((bay) => {
            if (
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
                  <div
                    className={
                      bay.width > bay.height
                        ? classes.baytextrotate
                        : classes.baytext
                    }
                  >
                    {bay.active ? (
                      <div className={classes.status}>
                        <HighlightOffIcon />
                        Occupied
                      </div>
                    ) : (
                      <div className={classes.status}>
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
                </div>
              );
            } else if (
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
                  <div
                    className={
                      bay.width > bay.height
                        ? classes.baytextrotate
                        : classes.baytext
                    }
                  >
                    {bay.active ? (
                      <div className={classes.status}>
                        <HighlightOffIcon />
                        Occupied
                      </div>
                    ) : (
                      <div className={classes.status}>
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
                </div>
              );
            } else {
              return (
                <div
                  id="bay"
                  key={bay.id}
                  //   className={classes.bay}
                  style={{
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
                  <div
                    className={
                      bay.width > bay.height
                        ? classes.baytextrotate
                        : classes.baytext
                    }
                  >
                    {bay.active ? (
                      <div className={classes.status}>
                        <HighlightOffIcon />
                        Occupied
                      </div>
                    ) : (
                      <div className={classes.status}>
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
                </div>
              );
            }
          })}
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
}
