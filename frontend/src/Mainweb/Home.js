import React from "react";
import "./Home.css";
import web from "../images/undraw_studying_re_deca.svg";
import Common from "./Common";

function Home() {
  console.log("00000inhome");
  return (
    <>
      <div className="home-content">
        <Common
          starting="Joyful learning starts here!"
          middle="Inspire a lifetime of learning and discovery with our free, fun educational program for children ages two to ten."
          get="Get Started"
          image={web}
        />
      </div>
    </>
  );
}

export default Home;
