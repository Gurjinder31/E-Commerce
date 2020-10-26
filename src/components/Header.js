import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import "../css/header.css";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebase";

const Header = () => {
  //  use that magic useStateValue() to pul the information
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(user);

  const handleAuthentication = () => {
    if (user) {
      // for sign out
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          alt="logo"
          src={require("../images/logo.png")}
        />
      </Link>

      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        {/* if there no user then push to login page */}
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionOne">Hello {user?.email}</span>
            <span className="header_optionTwo">
              {user ? "Sign Out" : "Sign IN"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionOne">Return</span>
            <span className="header_optionTwo">Your Order</span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionOne">Your</span>
          <span className="header_optionTwo">Prime</span>
        </div>

        <Link to="checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionTwo header_basketCount ">
              {/* ? optional chaining handle the error */}
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
