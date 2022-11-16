var db = require("../model/index");
var User = db.userdetails;
let Todo = db.tododetails;
var UserTodo = db.UserTodo;
var oneTOone = async (req, res) => {
  const data = await User.findAll({
    include: Todo,
  });
  res.send({ data });
};
let oneToMany = async (req, res) => {
  const user = req.user;
  const data = await User.findAll({
    include: Todo,
    where: { id: user.id },
  });
  res.send({ data });
};
let ManytoMany = async (req, res) => {
  const user = req.user;
  const data = await User.findAll({
    include:Todo,
    where: { id: user.id },
  });
  res.send({ data });
};
module.exports = {
  oneTOone,
  oneToMany,
  ManytoMany,
};
