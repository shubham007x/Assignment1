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
      user = new UserModel({
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
      await user.save();
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "error", error });
  }
});
app.post("/users/:username/friends",async(req,res)=>{
  const {username}=req.params;
  //console.log(username)
  try {
    const user = await UserModel.findOne({ username });
    console.log(user)
    if (!user) return res.status(404).json({ error: 'User not found' });

    const followersResponse = await axios.get(`https://api.github.com/users/${username}/followers`);
    const followingResponse = await axios.get(`https://api.github.com/users/${username}/following`);

    const followers = followersResponse.data.map(f => f.login);
    console.log(followers);
    const following = followingResponse.data.map(f => f.login);

    const mutuals = followers.filter(f => following.includes(f));
    user.friends = mutuals;

    await user.save();
    res.json(mutuals);
  } catch (err) {
    res.status(500).json({ error: 'Error finding mutual followers' });
  }
})
app.listen(8000, async () => {
  try {
    await connection;
    console.log("DB connected successfully");
  } catch (error) {
    console.log("connection failed");
  }
  console.log("listing on 8000");
});
