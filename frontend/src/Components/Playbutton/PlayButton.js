import React from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export const PlayButton = ({ handlePause }) => {
  return (
    <>
      <button onClick={() => handlePause()}>
        <PlayArrowIcon fontSize="large" />{" "}
      </button>
    </>
  );
};
