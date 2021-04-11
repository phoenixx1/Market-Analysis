export default (state = "", action) => {
  switch (action.type) {
    case "SET_STUDY":
      if (action.payload === state) {
        return "";
      }
      return action.payload;
    default:
      return state;
  }
};
