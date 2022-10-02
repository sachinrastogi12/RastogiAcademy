import React from "react";
import PauseIcon from "@mui/icons-material/Pause";

export const PauseButton = ({ handlePause }) => {
  return (
    <>
      <button onClick={() => handlePause()}>
        <PauseIcon fontSize="large" />
      </button>
    </>
  );
};
