import React, { useEffect, useState } from "react";
import { makeStyles, Grid, useTheme } from "@material-ui/core";
import Axios from "axios";
import qs from "qs";
import LoadingAnimation from "./LoadingAnimation";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  parkingcontainer: {
    display: "flex",
    flexDirection: "row",
    width: "1000px",
    height: "700px",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.warning.light,
    position: "relative",
  },
}));

export default function ParkingLot(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [Found, setFound] = useState(false);
  const [Loading, setLoading] = useState(true);
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
          {BayData.map((bay) => (
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
              {bay.active ? "Occupied" : "Free"}
            </div>
          ))}
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
}
