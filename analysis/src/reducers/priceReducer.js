export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_PRICES":
      return [...state, action.payload];
    default:
      return state;
  }
};
