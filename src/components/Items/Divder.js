import React from "react";

export const Divder = ({ mrtop = true }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        backgroundColor: "#dddd",
        marginTop: mrtop && "1rem",
        marginBottom: "1rem",
      }}
    ></div>
  );
};
