export default (state = "CandleStick", action) => {
  switch (action.type) {
    case "SET_TYPE":
      return action.payload;
    default:
      return state;
  }
};
