import gitNames from "../apis/gitNames";
import newsAPI from "../apis/newsAPI";
import _ from "lodash";

// export const fetchNames = () => async (dispatch) => {
//   const response = await gitNames.get("/companyList.json");
//   //   console.log("res: ", response);
//   dispatch({ type: "FETCH_NAMES", payload: response.data });
// };

// export const fetchNews = () => async (dispatch) => {
//   // const response = await newsAPI.get();
//   const response = await gitNames("/news.json");
//   // console.log("news: ", response.data.articles);
//   dispatch({ type: "FETCH_NEWS", payload: response.data.articles });
// };

// Used lodash library to solve the issue of refetching the same data after every render or change of page using the _.memoize library it does not call the same API again it checks if it has the values stored.

export const fetchNames = () => (dispatch) => {
  _fetchNames(dispatch);
};
const _fetchNames = _.memoize(async (dispatch) => {
  const response = await gitNames.get("/companyList.json");
  //   console.log("res: ", response);
  dispatch({ type: "FETCH_NAMES", payload: response.data });
});

export const fetchNews = () => (dispatch) => {
  _fetchNews(dispatch);
};
const _fetchNews = _.memoize(async (dispatch) => {
  // const response = await newsAPI.get();
  const response = await gitNames("/news.json");
  // console.log("news: ", response.data.articles);
  dispatch({ type: "FETCH_NEWS", payload: response.data.articles });
});

export const fetchPrices = () => (dispatch) => {
  _fetchPrices(dispatch);
};
const _fetchPrices = _.memoize(async (dispatch) => {
  const response = await gitNames.get("/itc.json");
  //   console.log("res: ", response);
  dispatch({ type: "FETCH_PRICES", payload: response.data });
});

export const setName = (name) => (dispatch) => {
  dispatch({ type: "SET_NAME", payload: name });
};
