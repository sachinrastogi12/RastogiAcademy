import { Paper } from "@mui/material";
import React from "react";
import congratsImg from "../../assets/49897-removebg-preview.png";
import sadImg from "../../assets/epson059-removebg-preview.png";
import "./ScoreModal.css";
import { useSelector } from "react-redux";
import bg from "../../assets/5621334.jpg";
export default function ScoreModal({ score, totalQues, closeModal }) {
  const userData = useSelector((state) => state.userInfo.user_name);

  return (
    <div className="movie__model-backdrop flex__center">
      <div className="movie__model-wrapper" onClick={closeModal}></div>
      <div className="movie__model-content">
        {" "}
        <div className="movie__model-content-img">
          <img
            src={score > totalQues / 2 ? congratsImg : sadImg}
            alt="congrats"
          />
        </div>
        <h1>
          {score > totalQues / 2
            ? `Congratulations ${userData.givenName} `
            : `Better luck next time ${userData.givenName} `}
          you scored {score} out of {totalQues}
        </h1>
      </div>
    </div>
  );
}
