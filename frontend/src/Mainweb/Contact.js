import React from "react";
import Navbarweb from "./Navbarweb";
import Common from "./Common";
import web from "../images/undraw_learning_re_32qv.svg";

function Contact() {
  return (
    <div>
      <Navbarweb />
      <Common
        starting="Welcome to Contact Us Page"
        middle="We would greatly appreciate it if you kindly give us some feedback and a response"
        get="Contact US"
        image={web}
      />
    </div>
  );
}

export default Contact;
