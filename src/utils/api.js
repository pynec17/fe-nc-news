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
export const getAllArticles = (topicParam) => {
  return myApi
    .get("/articles", { params: { topic: topicParam } })
    .then(({ data }) => {
      return data.articles;
    });
};

// Gets single article - Single Article
export const getArticle = (id) => {
  return myApi.get(`/articles/${id}`).then((res) => {
    return res.data.article;
  });
};

// Get all comments for article - Single Article
export const getComments = (id) => {
  return myApi
    .get(`articles/${id}/comments`)
    .then((res) => {
      console.log(res.data.comments);
      return res.data.comments;
    })
    .catch((err) => {
      console.dir(err);
    });
};
