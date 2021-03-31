export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_ARIMA":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  