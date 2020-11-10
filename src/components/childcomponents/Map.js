import React from "react";

export default function Map(props) {
  const SensorID = props.match.params.SensorID;
  const DeviceID = props.match.params.DeviceID;

  return (
    <div>
      Sensor: {SensorID}
      <br />
      Device: {DeviceID}
    </div>
  );
}
