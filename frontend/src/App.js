import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import { userInfoActions } from "./store/user-slice";
import Educationalwebapp from "./Mainweb/Educationalwebapp";
import Spelling from "./mainActivities/Spelling";
import Comprehension from "./mainActivities/Activitysecond/Comprehension";
import Home from "./Mainweb/Home";
import About from "./Mainweb/About";
import Contact from "./Mainweb/Contact";
import Service from "./Mainweb/Service";
import Navbarweb from "./Mainweb/Navbarweb";
import Login from "./Loginmodal/Login";
import DragandDropActivity from "./mainActivities/DragandDrop/DragandDropActivity";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:4000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          console.log("in response");
          console.log("response", response);
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          dispatch(userInfoActions.setUserState(resObject.user));

          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const userData = useSelector((state) => state.userInfo);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Main website routes */}
          <Route path="/" element={<Educationalwebapp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/service" element={<Service />} />

          {/* main website route end */}

          {/* Main activities components inside services */}
          {userData.is_logged && (
            <Route path="/spelling" element={<Spelling />} />
          )}
          {userData.is_logged && (
            <Route path="/Comprehension" element={<Comprehension />} />
          )}

          <Route path="/draganddrop" element={<DragandDropActivity />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
