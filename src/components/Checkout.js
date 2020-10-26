import React from "react";

import "../css/checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/15/CA_MM/events/hgg2020/traffic/2020_HGG_Universal_Detail_ILM_Desktop_Low_600x45_en._CB418884928_.png"
          alt=""
        />
        <div>
          {/* optional chaing  handle error */}
          <h3>Hello {user?.email}</h3>
          <h2 className="checkout_title">Your shopping basket</h2>
          {/* 
           take bunch of props 
           add item to basket then map through showing inside Checkout inform checkoutPrduct component     */}
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
