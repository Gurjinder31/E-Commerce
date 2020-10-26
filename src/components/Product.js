import React from "react";

import "../css/product.css";
import { useStateValue } from "./StateProvider";

const Product = ({ id, title, price, image, rating }) => {
  // get basket out of state
  const [{ basket }, dispatch] = useStateValue();

  // pushing value to data layer
  const addToBasket = () => {
    // dispatch manipulate data
    // dispatch some action ino data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
          <p>{rating}</p>
        </div>
      </div>
      <img src={image} alt="item" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
};

export default Product;
