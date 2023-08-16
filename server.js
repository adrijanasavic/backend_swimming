require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Users = require("./models/userModel");
const Posts = require("./models/postModel");

const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL, (err) => {
  if (!err) {
    console.log("Database connected...");
  } else {
    console.log(err);
  }
});

// const data = [
//   {
//     title: "Naslov1",
//     description: "Opis1",
//   }
// ];

// data.forEach(el => {
//   const newData = new Posts({
//     title: el.title,
//     description: el.description

//   });
//   newData.save();
// });

// const data = [
//   {
//     username: "Baka",
//     password: "Baka",
//   }
// ];

// data.forEach(el => {
//     const newData = new Users({
//         username: el.username,
//         password: el.password

//     });
//     newData.save();
// });
//detail post
app.get("/postdetail/:id", (req, res) => {
  Posts.findOne({ _id: req.params.id })
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

//delete post
app.delete("/post/:id", (req, res) => {
  Posts.deleteOne({ _id: req.params.id })
    .then((item) => {
      Projects.find({}, (err, result) => {
        res.send(result);
      });
    })
    .catch((err) => console.log(err));
});


//edit post
app.patch("/post/:id", async (req, res) => {
  try {
    const updatePost = await Posts.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/post/:id", (req, res) => {
  Posts.findOne({ _id: req.params.id })
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});
// add post
app.post("/post", async (req, res) => {
  let newPost = new Posts(req.body);
  let addPost = await newPost.save();
  if (addPost) {
    res.send("Added new post");
  } else {
    res.send("Didn't add new post")
  }
  console.log(req.body);
});

app.get("/posts", (req, res) => {
  Posts.find({})
    .then((item) => res.json(item))
    .catch((err) => console.log(err))
});

app.post("/login", (req, res) => {
  const reqBody = req.body;
  console.log(req.body);
  Users.findOne(reqBody, (err, data) => {
    if (err) {
      const errorMsg = `Error on getting user from DB: ${err}`;
      res.status(416).send(errorMsg);
      return;
    }
    if (data?.username) {
      res.send(data);
    } else {
      res.status(210).send("User not found");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
