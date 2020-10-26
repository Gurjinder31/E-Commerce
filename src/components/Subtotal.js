import React from "react";
import CurrencyFormat from "react-currency-format";

import { getBasketTotal } from "./reducer/Reducer";
import "../css/subtotal.css";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

const Subtotal = ({ price }) => {
  const history = useHistory();

  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length}):
              <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains gift
            </small>
          </>
        )}
        s
        decimalScale={2}
        // import value from Reducer
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      {/* onlick  to push or redirect to payment page 
        if it's not payment componet it redirect / (Router)compnent which is home compent
      */}
      <button onClick={(e) => history.push("/payment")}>
        Proceed to checkout
      </button>
    </div>
  );
};

export default Subtotal;
