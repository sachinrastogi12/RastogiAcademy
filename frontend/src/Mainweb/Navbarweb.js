import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Navbarweb.css";
import UserTab from "./UserTab/UserTab";
function Navbarweb() {
  const userInfo = useSelector((state) => {
    return {
      avatar: state.userInfo.user_avatar,
      name: state.userInfo.user_name,
      log_status: state.userInfo.is_logged,
    };
  });

  console.log(" in navbarwebapp", userInfo);
  return (
    <>
      <div id="navbarweb-css" className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <a
                  className="navbar-brand link-size"
                  href="http://localhost:3000"
                >
                  Rastogi Academy
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  {/* me for margin end right and  ms-auto is for margin left */}
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbarActive">
                    <div className="navBar-buttons">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link link-size"
                          aria-current="page"
                          to="/"
                        >
                          Home
                        </NavLink>
                      </li>
                    </div>
                    <div className="navBar-buttons">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link link-size"
                          aria-current="page"
                          to="/service"
                        >
                          Services
                        </NavLink>
                      </li>
                    </div>
                    <div className="navBar-buttons">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link link-size"
                          aria-current="page"
                          to="/about"
                        >
                          About
                        </NavLink>
                      </li>
                    </div>
                    <div className="navBar-buttons">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link link-size"
                          aria-current="page"
                          to="/contact"
                        >
                          Contact Us
                        </NavLink>
                      </li>
                    </div>
                    {userInfo.log_status ? (
                      <div className="navBar-buttons">
                        <UserTab
                          name={userInfo.name}
                          avatar={userInfo.avatar}
                        />
                      </div>
                    ) : (
                      <div className="navBar-buttons">
                        <li className="nav-item">
                          <NavLink
                            className="nav-link link-size"
                            aria-current="page"
                            to="/login"
                          >
                            Sign in
                          </NavLink>
                        </li>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbarweb;
