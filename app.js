const { getCategories, getReviews,getReviewById, getReviewCommentsById, postCommentsByReviewId, patchReviewVotes} = require("./controllers/controllers");



const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews/:review_id/comments", getReviewCommentsById);

app.post("/api/reviews/:review_id/comments", postCommentsByReviewId);

app.patch("/api/reviews/:review_id",patchReviewVotes)



app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;