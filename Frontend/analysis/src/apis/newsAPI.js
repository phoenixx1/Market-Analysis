import axios from "axios";
import { key } from "./newsapiKey";

export default axios.create({
  baseURL: `http://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${key}`,
});
