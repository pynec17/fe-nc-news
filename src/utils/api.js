import axios from "axios";

const myApi = axios.create({
  baseURL: "https://claytons-news.herokuapp.com/api",
});

// Gets all topics - Nav bar
export const getAllTopics = () => {
  return myApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

// Gets all articles - Homepage
export const getAllArticles = () => {
  return myApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
