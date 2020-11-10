import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoadingAnimation() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <CircularProgress />
    </div>
  );
}
