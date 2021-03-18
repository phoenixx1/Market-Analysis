// import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// export const fetchPostAndUsers = () => async (dispatch, getState) => {
//   await dispatch(fetchPosts());

//   // const userIds = _.uniq(_.map(getState().posts, "userId"));
//   // userIds.forEach((id) => dispatch(fetchUser(id)));

//   // Alternate for above commented lines
//   _.chain(getState().posts)
//     .map("userId")
//     .uniq()
//     .forEach((id) => dispatch(fetchUser(id)))
//     .value();
// };

export const fetchNames = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/companyList.json");
  // console.log(response);
  dispatch({ type: "FETCH_NAMES", payload: response.data });
};

export const fetchNews = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/news.json");
  // console.log(response);
  dispatch({ type: "FETCH_NEWS", payload: response.data });
};

// export const fetchUser = (id) => async (dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// };

// Memoize approach
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
