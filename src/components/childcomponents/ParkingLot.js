import React, { useEffect, useState } from "react";
import { makeStyles, Grid, useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Axios from "axios";
import qs from "qs";
import LoadingAnimation from "./LoadingAnimation";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
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
  //function call
  useEffect(() => {
    getBayData();
  }, []);
  console.log(BayData);
  return (
    <div className={classes.container}>
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
                  key={bay.id}
                  style={{
                    position: "absolute",
                    left: bay.x,
                    top: bay.y,
                    backgroundColor: bay.active
                      ? theme.palette.error.main
                      : theme.palette.success.dark,
                    height: bay.height,
                    width: bay.width,
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <div
                    className={
                      bay.width > bay.height
                        ? classes.baytextrotate
                        : classes.baytext
                    }
                  >
                    {bay.active ? "Occupied" : "Free"}
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
                  key={bay.id}
                  style={{
                    position: "absolute",
                    left: bay.x / 1.5,
                    top: bay.y / 1.5,
                    backgroundColor: bay.active
                      ? theme.palette.error.main
                      : theme.palette.success.dark,
                    height: bay.height / 1.5,
                    width: bay.width / 1.5,
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <div
                    className={
                      bay.width > bay.height
                        ? classes.baytextrotate
                        : classes.baytext
                    }
                  >
                    {bay.active ? "Occupied" : "Free"}
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
                  key={bay.id}
                  style={{
                    position: "absolute",
                    left: bay.x / 2.5,
                    top: bay.y / 2.5,
                    backgroundColor: bay.active
                      ? theme.palette.error.main
                      : theme.palette.success.dark,
                    height: bay.height / 2,
                    width: bay.width / 2,
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <div
                    className={
                      bay.width > bay.height
                        ? classes.baytextrotate
                        : classes.baytext
                    }
                  >
                    {bay.active ? "Occupied" : "Free"}
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
