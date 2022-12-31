const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const JWT_SECRET = "Hash is a god boy.";

const fetchUser = async(req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please give us a correct token." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(data);
    req.user=user
    next();
    
} catch (error) {
    return res.status(401).send({ error: "Error token." });
  }
};
module.exports = fetchUser;
