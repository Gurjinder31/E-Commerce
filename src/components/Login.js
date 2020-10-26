import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { auth } from "../firebase";
import "../css/login.css";

const Login = () => {
  // allow to programmatclay change URL
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    // firebase login sheet

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // auth is not empty push this new page(forcing to redirect)
        history.push("/");
      })
      .catch((error) => alert(error.meesage));
  };
  const register = (e) => {
    e.preventDefault();

    // create user of email and password
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // success
        console.log(auth);
        // auth is not empty push this new page(forcing to redirect)
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src={require("../images/logo2.png")}
          alt="logo"
        />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          {/*  user type it trigger on Change it give us event setEmail target value */}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login_signInButton">
            Sign-In
          </button>
          <p>
            By Clicking, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
          <button onClick={register} className="login_registerButton">
            Create Your Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
