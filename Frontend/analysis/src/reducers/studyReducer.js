export default (state = [], action) => {
  if (action.payload === "Clear") {
    return [];
  } else {
    switch (action.type) {
      case "FETCH_STUDIES":
        return [...state, action.payload];
      default:
        return state;
    }
  }
};
