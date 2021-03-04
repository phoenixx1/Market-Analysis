export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_NAMES":
      return [...state, action.payload];
    default:
      return state;
  }
};
