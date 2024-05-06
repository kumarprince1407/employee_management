//Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig.js";
import TextField from "@mui/material/TextField";
import { Details } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// const Login = ({ page }) => {//props implementation of switching b/w pages
const LoginRegister = () => {
  //hooks implementation of switching b/w pages
  const emailRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]+(.in)*$/;
  const passwordRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;

  const navigate = useNavigate();

  const location = useLocation();

  const page = location.pathname === "/login" ? true : false; //For implementation using useLocation hook

  console.log("Location: ", location);

  const app = initializeApp(firebaseConfig);
  console.log(app);
  const auth = getAuth();
  console.log("AUTH: ", auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userExists, setUserExists] = useState(false);
  const [isEmailUsed, setIsEmailUsed] = useState(false);

  const ctaClickhandler = (e) => {
    e.preventDefault();
    //navigate("/home");
    if (page) {
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/home");
          }
        })
        .catch((error) => setUserExists(true));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/home");
          }
        })
        .catch((error) => setIsEmailUsed(true));
    }
  };

  useEffect(() => {
    setIsEmailUsed(false);
    setUserExists(false);
  }, [location]);
  //depends on location b/c when we go to the 'register' page ane the email address already exists, and when we go to the
  //'login' page the 'url' gets changed

  //onChange method for email
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  //onChange method for password change has been implemented directly as an inline function
  return (
    <React.Fragment>
      <div className="loginContainer">
        <div className="mainContainer">
          <h2>{page ? "Login" : "Register"}</h2>
          <br />
          <form>
            <TextField
              className="form-control"
              value={email}
              onChange={emailOnChangeHandler}
              type="email"
              placeholder="Email"
            />
            <TextField
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <Button
              className="btn btn-danger btn-block"
              variant="contained"
              onClick={ctaClickhandler}
            >
              {page ? "Sign IN" : "Sign UP"}
            </Button>
            <br />
            <div className="form-check">
              {page && (
                <Checkbox
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckdefault"
                />
              )}
              {page && <span style={{ color: "blue" }}>Remember Me</span>}
              <label
                className="form-check-label text-white"
                htmlFor="flexCheckDefault"
              ></label>
            </div>
          </form>
          <br />
          <br />
          {userExists && (
            <p className="text-danger">
              User does not exist. Please enter correct details or go for Signup
            </p>
          )}
          {isEmailUsed && (
            <p className="text-danger">
              Email alreday in use. Please sign up using a different email
            </p>
          )}
          <div className="login-form-other">
            <div className="login-signup-now">
              {page ? "New Admin? " : "Existing Admin"} &nbsp;
              <Link className="" to={page ? "/register" : "/login"}>
                {page ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginRegister;
