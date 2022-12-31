const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const fetchUser = require("./../middleware/fetchUser");

const JWT_SECRET = "Hash is a god boy.";

router.post("/signup", async (req, res, next) => {
  try {
    const find_user = await User.findOne({ email: req.body.email });

    if (find_user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const user = await User.create(req.body);
    const token = jwt.sign(user.id, JWT_SECRET);
    res.json({
      status: "Success",
      user: user,
      token: token,
    });
  } catch (error) {
    res.send({ error });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let success = false;

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: success,
        error: "Please try to give correct credentials.",
      });
    }
    if (user.password !== req.body.password) {
      return res.status(400).json({
        success: success,
        error: "Please try to give correct credentials.",
      });
    }
    const token = jwt.sign(user.id, JWT_SECRET);
    success = true;
    res.json({
      success: success,
      status: "Success",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/getUser", fetchUser, async (req, res, next) => {
  try {
    const user = await User.findOne(req.user).select("-password");
    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
