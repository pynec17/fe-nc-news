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
export const getAllArticles = (page, topicParam, sortByParam, orderParam) => {
  return myApi
    .get(`/articles?p=${page}&limit=5`, {
      params: { topic: topicParam, sort_by: sortByParam, order: orderParam },
    })
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
export const getComments = (id, page) => {
  return myApi.get(`articles/${id}/comments?p=${page}&limit=5`).then((res) => {
    return res.data.comments;
  });
};

// Increase/decrease article vote count
export const patchVotes = (article_id, increment) => {
  return myApi
    .patch(`articles/${article_id}`, { inc_votes: increment })
    .then((res) => {});
};

// Add a new comment - Comments component
export const postComment = (user, newComment, id) => {
  return myApi
    .post(`articles/${id}/comments`, { username: user, body: newComment })
    .then((res) => {});
};

// Delete comment - Comments component
export const deleteComment = (id) => {
  return myApi.delete(`comments/${id}`).then((res) => {});
};

// Increase/decrease comment vote count
export const patchCommentVotes = (comment_id, increment) => {
  return myApi
    .patch(`comments/${comment_id}`, { inc_votes: increment })
    .then((res) => {});
};

// Post article - Post article component
export const postArticle = (title, body, topic, author) => {
  return myApi
    .post(`/articles`, {
      title: title,
      body: body,
      topic: topic,
      author: author,
    })
    .then((res) => {
      return res.data.article;
    });
};

// Delete article - single article page
export const deleteArticle = (id) => {
  return myApi.delete(`/articles/${id}`).then((res) => {});
};

// Get users - Users page
export const getUsers = () => {
  return myApi.get("/users").then(({ data }) => {
    return data.users;
  });
};
