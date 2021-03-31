export default (state = "3MINDIA", action) => {
  switch (action.type) {
    case "SET_NAME":
      return action.payload;
    default:
      return state;
  }
};
