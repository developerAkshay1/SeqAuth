var db = require("../model/index");
const { jwtToken } = require("../utils/jsonwebtoken");
var User = db.userdetails;
var Todo = db.tododetails;
const bcrypt = require("bcrypt");
const { where } = require("sequelize");

var getuser = async (req, res) => {
  let data = req.user;
  res.json({ name: data.name, email: data.email });
};
var addUser = async (req, res) => {
  const { password, email, name, phone } = req.body;
  const existingUser = await User.findOne({
    where: { name },
  });
  if (existingUser) {
    return res.status(400).json("username already exists");
  }
  const existingemail = await User.findOne({
    where: { email: email },
  });
  if (existingemail) {
    return res.status(400).json("email already exists");
  }
  const existingPhone = await User.findOne({ where: { phone } });
  if (existingPhone) {
    return res.status(400).json("phone already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let data = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  res.send(data);
};

const loginauthenticateduser = async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await User.findOne({ where: { email: email } });
  let Token = jwtToken(userEmail);
  const encryptedpassword = await bcrypt.compare(password, userEmail.password);
  if (encryptedpassword) {
    res.status(200).json({ token: Token });
  } else {
    res.send("wrong password");
  }
};

module.exports = {
  addUser,
  loginauthenticateduser,
  getuser,
};
