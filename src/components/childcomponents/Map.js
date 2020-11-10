import React, { useEffect, useState } from "react";
import Axios from "axios";
import qs from "qs";
import LoadingAnimation from "./LoadingAnimation";
export default function Map(props) {
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
  console.log(SensorData);
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
    <div>
      Sensor: {SensorID}
      <br />
      Device: {DeviceID}
      <br />
      {Loading ? <LoadingAnimation /> : ""}
      {Found ? (
        <div>
          lat: {SensorData.latitude}
          <br />
          lon: {SensorData.longitude}
        </div>
      ) : (
        "Not Found"
      )}
    </div>
  );
}
