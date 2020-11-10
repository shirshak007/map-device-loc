import React from "react";
import Sentry from "react-activity/lib/Sentry";

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
      <Sentry
        style={{ width: "100%" }}
        color="#000000"
        size={32}
        speed={1}
        animating={true}
      />
    </div>
  );
}
