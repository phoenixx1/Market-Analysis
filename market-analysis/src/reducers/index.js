import { combineReducers } from "redux";
import nameReducer from "./nameReducer";
import newsReducer from "./newsReducer";

export default combineReducers({ company: nameReducer, news: newsReducer });
