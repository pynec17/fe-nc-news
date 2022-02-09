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

// Gets all articles and handles all filters/sorts- Homepage
export const getAllArticles = (topicParam, sortByParam, orderParam) => {
  console.log(topicParam, "<<<< topic");
  console.log(sortByParam, "<<<< sort_by");
  console.log(orderParam, "<<<< order");
  return myApi
    .get("/articles", {
      params: { topic: topicParam, sort_by: sortByParam, order: orderParam },
    })
    .then(({ data }) => {
      console.log(data.articles);
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
      return res.data.comments;
    })
    .catch((err) => {
      console.dir(err);
    });
};

// Increase/decrease article vote count
export const patchVotes = (article_id, increment) => {
  return myApi
    .patch(`articles/${article_id}`, { inc_votes: increment })
    .then((res) => {
      console.log(res.data.article);
    });
};

// Add a new comment - Comment component
export const postComment = (user, newComment, id) => {
  return myApi
    .post(`articles/${id}/comments`, { username: user, body: newComment })
    .then((res) => {
      console.log(res.data.comment);
    });
};
