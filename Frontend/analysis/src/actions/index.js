import gitNames from "../apis/gitNames";
import newsAPI from "../apis/newsAPI";
import _ from "lodash";
import getPrices from "../apis/getPrices";

// Used lodash library to solve the issue of refetching the same data after every render or change of page using the _.memoize library it does not call the same API again it checks if it has the values stored.

export const fetchNames = () => (dispatch) => {
  _fetchNames(dispatch);
};
const _fetchNames = _.memoize(async (dispatch) => {
  const response = await gitNames.get("/companyList.json");
  dispatch({ type: "FETCH_NAMES", payload: response.data });
});

export const fetchNews = () => (dispatch) => {
  _fetchNews(dispatch);
};

const _fetchNews = _.memoize(async (dispatch) => {
  const response = await newsAPI.get();
  dispatch({ type: "FETCH_NEWS", payload: response.data.articles });
});

export const fetchPrices = (company) => async (dispatch) => {
  const response = await getPrices.get(`/data/${company}`);
  console.log("res: ", response.data.prices);
  dispatch({ type: "FETCH_PRICES", payload: response.data.prices });
};


export const fetchArima = (company) => async (dispatch) => {
  const response = await getPrices.get(`/ARIMA/${company}`);
  console.log("res: ", response.data);
  dispatch({ type: "FETCH_ARIMA", payload: response.data });
};

export const setName = (name) => (dispatch) => {
  dispatch({ type: "SET_NAME", payload: name });
};

export const setChartType = (type) => (dispatch) => {
  dispatch({ type: "SET_TYPE", payload: type });
};

export const loadStudies = (study) => (dispatch) => {
  dispatch({ type: "LOAD_STUDY", payload: study });
};

export const latestStudy = (study) => (dispatch) => {
  dispatch({ type: "SET_STUDY", payload: study });
};
