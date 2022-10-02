import React from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function InstructionButton({ handleClick }) {
  console.log(handleClick);
  return (
    <div>
      <button onClick={handleClick} style={{ borderRadius: "25px" }}>
        {" "}
        <VolumeUpIcon />{" "}
      </button>
    </div>
  );
}

export default InstructionButton;
