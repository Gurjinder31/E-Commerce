import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";

import axios from "./axios";
import "../css/payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { getBasketTotal } from "./reducer/Reducer";
import { useStateValue } from "./StateProvider";
import { db } from "../firebase.js";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  //   clientsecret tell stripe to send payment to get client secret from stripe
  const [clientSecret, setClientSecret] = useState(true);

  // run when payment ocmpnents load
  // any variable change in brackets []
  useEffect(() => {
    // generate the special stripe secret allow to charge customer
    // when basket change need to tell stripe to get new secret

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits ?total is query param
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    // call method in useeffect
    getClientSecret();
  }, [basket]);

  console.log(user);

  const handleSubmit = async (e) => {
    // fancy Stripe stuff
    e.preventDefault();
    setProcessing(true);

    // stripe = useStripe
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          // elements = useelements
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        // its using noSQL datastructor
        // db is from firebase.js
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            // when the order is created
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // empty basket
        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    // Listen for changes in CArdElement
    // and display any erros as customer types theor card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout(
          <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
      </div>
      <div className="payment_container">
        {/* Dilevery address */}

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>60 pine</p>
            <p>ON, CA</p>
          </div>
        </div>

        {/* Review items */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Revie ietms and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              // whatever have in basket it's gonna show up screen

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

        {/* Payement method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* Stripe magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  // render out some text
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  // import value from Reducer
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {/* coming from useState */}
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Procesing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Error  if there is error only then show error*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
