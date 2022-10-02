import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

function Common(props) {
  const { starting, middle, get, image } = props;
  return (
    <>
      <section id="header" className="d-flex align-items-center mb-0">
        <div className="container-fluid">
          <div className="row mt-10 mb-0">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="wrapperHero">

                    {/* Contents */}
                  <div className="col-md-6 pt-40 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column title">  
                    <h1><strong> {starting} </strong></h1>
                    <h4 className="my-3">{middle}</h4>
                    <div className="mt-4">
                      <NavLink to="/service" className="btn-get-started">{get}</NavLink>
                    </div>
                  </div>
                   
                   {/* Vertical motion image in the background  */}
                  <div className="col-lg-6 order-1 order-lg-2 header-img">
                    <img src={image} className="img-fluid animated" alt="home img"/>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Common;
