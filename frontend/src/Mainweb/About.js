import React from "react";
import Common from "./Common";
import web from "../images/undraw_learning_re_32qv.svg";
import Navbarweb from "./Navbarweb";

function About() {
  return (
    <>
      <Navbarweb />
      <Common
        starting="Welcome to About Page"
        middle="We are the group of talented people making to learn in your comfort"
        get="Know more about Us"
        image={web}
      />
    </>
  );
}

export default About;
