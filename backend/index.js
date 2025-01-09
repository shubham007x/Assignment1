const express = require("express");
var cors = require("cors");
const { connection } = require("./config/db");
const axios = require("axios");
const { UserModel } = require("./models/User.model");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

//POST /user endpoint to save github user data

app.post("/users", async (req, res) => {
  const { username } = req.body;

  try {
    let user = await UserModel.findOne({ username }); //feching user
    console.log({user,msg:"inside db"});

    if (!user) {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      const data = res.data;
      console.log(data);

      //Saving user data to MongoDb Database
      user = await UserModel.create({
        username: data.login,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        location: data.location,
        blog: data.blog,
        bio: data.bio,
        created_at: data.created_at,
      });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "error", error });
  }
});

app.listen(8000, async () => {
  try {
    await connection;
    console.log("DB connected successfully");
  } catch (error) {
    console.log("connection failed");
  }
  console.log("listing on 8000");
});
