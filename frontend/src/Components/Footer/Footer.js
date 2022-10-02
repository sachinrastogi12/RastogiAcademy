import React from "react";
import "./Footer.css";

function Footer({ handleSubmit, btnDisable }) {
  return (
    <>
      <div>
        <button
          onClick={handleSubmit}
          class="b1"
          style={{ cursor: btnDisable() ? "not-allowed " : "pointer" }}
        >
          Submit
        </button>
        {/* <button onClick={()=>alert("Congratulations...! Your score is : ")} class="b1" >Submit</button> */}
      </div>
    </>
  );
}

export default Footer;
