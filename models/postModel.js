const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    title: String,
    description: String,
    picture: String,
    titleEn: String,
    descriptionEn: String,
    date: String
});
const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;