import { combineReducers } from "redux";
import nameReducer from "./nameReducer";
import newsReducer from "./newsReducer";
import priceReducer from "./priceReducer";
import selectedCompanyReducer from "./selectedCompanyReducer";
import chartReducer from "./chartReducer";
import studyReducer from "./studyReducer";

export default combineReducers({
  company: nameReducer,
  news: newsReducer,
  prices: priceReducer,
  currentCompany: selectedCompanyReducer,
  currentChartType: chartReducer,
  loadStudies: studyReducer,
});
