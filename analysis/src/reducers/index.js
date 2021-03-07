import { combineReducers } from "redux";
import nameReducer from "./nameReducer";
import newsReducer from "./newsReducer";
import priceReducer from "./priceReducer";
import selectedCompanyReducer from "./selectedCompanyReducer";

export default combineReducers({
  company: nameReducer,
  news: newsReducer,
  prices: priceReducer,
  currentCompany: selectedCompanyReducer,
});
