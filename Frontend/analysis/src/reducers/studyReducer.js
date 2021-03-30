export default (state = [], action) => {
  if (action.payload === "Clear") {
    return [];
  } else {
    switch (action.type) {
      case "LOAD_STUDY":
        return [...state, action.payload];
      default:
        return state;
    }
  }
};
