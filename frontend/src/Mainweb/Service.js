import React from "react";
import Navbarweb from "./Navbarweb";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import "./Services.css";
import sentenceFill from "../images/sentenceFill__IN.png";
import Comprehension from "../images/comprehension_1.jpg";
import { useSelector } from "react-redux";

const Sdata = [
  { title: "Sentece_Fill_In" },
  { title: "Sentece_Fill_In" },
  { title: "Sentece_Fill_In" },
  { title: "Sentece_Fill_In" },
  { title: "Sentece_Fill_In" },
  { title: "Sentece_Fill_In" },
];

function Service() {
  const userData = useSelector((state) => state.userInfo);
  return (
    <>
      <Navbarweb />
      <div className="container-fluid" id="services">
        <div className="my-5 mt-0 pt-2">
          <h1 className="text-center color">
            {" "}
            <strong>OUR SERVICES</strong>{" "}
          </h1>
        </div>
        <div className="container-fluid">
          <div className="row pb-20">
            <div className="col-10 mx-auto">
              <div className="row gy-4">
                <div className="col-md-4 col-10 mx-auto">
                  <div class="card">
                    <img src={sentenceFill} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title deco">Sentence Fill In</h5>
                      <p class="card-text">
                        In this activity you will be given 5 questions to fill
                        in. Choose the correct option.
                      </p>
                      <NavLink
                        className="nav-link  startButton"
                        aria-current="page"
                        to={`/${userData.is_logged ? "spelling" : "login"}`}
                      >
                        {" "}
                        Start
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-10 mx-auto">
                  <div class="card">
                    <img src={Comprehension} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title deco">Comprehension</h5>
                      <p class="card-text ">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <NavLink
                        className="startButton nav-link "
                        aria-current="page"
                        to={`/${
                          userData.is_logged ? "Comprehension" : "login"
                        }`}
                      >
                        {" "}
                        Start
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="leftover"></div>
    </>
  );
}

export default Service;
