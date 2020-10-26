import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Header from "./Header";
import "../css/app.css";
import Home from "./Home";
import Checkout from "./Checkout";
import CheckoutProduct from "./CheckoutProduct";
import Login from "./Login";
import { auth } from "../firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51Hf7zyDWbqqkMD1bBOO5oFzey3DU63K6RgdILiR6AYi7nUfzRpU6ccdUxYPYeHQbZYqU7PAYheEjtkeKz1iCyH9Q00wfJDSbDC"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...
    // it always listning
    // when ever authentication changes i give us authuser
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        // the user just logged in / the user was loged in
        // every time login shoot user into data laye or logged out remove user inot data layer
        dispatch({
          type: "SET_USER",
          // user logged in set user to authUser
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>

          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
