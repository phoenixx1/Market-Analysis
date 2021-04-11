export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ARIMA":
      return action.payload;
    default:
      return state;
  }
};
