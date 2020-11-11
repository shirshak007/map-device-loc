import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Axios from "axios";
import qs from "qs";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LoadingAnimation from "./LoadingAnimation";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  mapcontainer: {
    padding: theme.spacing(2),
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: theme.spacing(1),
    },
  },
}));

export default function ShowMap(props) {
  const classes = useStyles();
  //getting data from previous view
  const SensorID = props.match.params.SensorID;
  const DeviceID = props.match.params.DeviceID;
  const [SensorData, setSensorData] = useState([]);
  const [Found, setFound] = useState(false);
  const [Loading, setLoading] = useState(true);
  //API Call
  const getSensorLocation = async () => {
    var data = qs.stringify({
      devid: DeviceID,
    });
    var config = {
      method: "post",
      url: "http://35.197.106.255:3000/api/v1.1/lastMultiple",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    await Axios(config)
      .then(function (response) {
        if (response.data.status) {
          setSensorData(response.data.data);
          setFound(true);
          setLoading(false);
        } else {
          setFound(false);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //check if refreshing in 10seconds
  //console.log(SensorData);
  //function call
  useEffect(() => {
    getSensorLocation();
    // refresh in every 10seconds
    const interval = setInterval(() => {
      getSensorLocation();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={classes.container}>
      {Loading ? <LoadingAnimation /> : ""}
      {Found ? (
        <div className={classes.mapcontainer}>
          {/*Displaying the map, The container height and width must be specified*/}
          <MapContainer
            center={[SensorData.latitude, SensorData.longitude]}
            zoom={14}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "80vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/*Displaying the marker, on click shows the sensor ID*/}
            <Marker position={[SensorData.latitude, SensorData.longitude]}>
              <Popup>Sensor ID: {SensorID}</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
