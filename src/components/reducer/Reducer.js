export const initialState = {
  basket: [],
};
// selector  teelis up basket all price add into final amount
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

// state of application and action is what you gonna do
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        // change basket whith add action
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      // findIndex does any of basket item match action id that just passed in
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      // copy basket into temporary variable newBasket
      let newBasket = [...state.basket];

      if (index >= 0) {
        // if found item
        // at index position splice one item
        newBasket.splice(index, 1);
      } else {
        console.warn(`${action.id} its not in basket! `);
      }

      return {
        // new item whith remaing item in basket
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    // filter out item matching id and it remove all of them with same id
    // return {
    //   ...state,
    //   basket: [...state.basket.filter((item) => item.id != action.id)],
    // };

    default:
      return state;
  }
};

export default reducer;
