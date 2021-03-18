export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_NEWS":
      return [...state, action.payload];
    default:
      return state;
  }
};
