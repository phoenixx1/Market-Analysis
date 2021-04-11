export default (state = "HDFC", action) => {
  switch (action.type) {
    case "SET_NAME":
      return action.payload;
    default:
      return state;
  }
};
