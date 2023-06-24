require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Users = require("./models/userModel");

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
