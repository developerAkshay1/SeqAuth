var db = require("../model/index");
const { jwtToken } = require("../utils/jsonwebtoken");
var User = db.userdetails;
var Todo = db.tododetails;
const bcrypt = require("bcrypt");

var createTodo = async (req, res) => {
  const {Task} = req.body;
  const{email} = req.user;
  let details = await Todo.create({ userEmail: email, Task, UserId:req.user.id });
   return res.send({
    email: email,
    Task: details.Task,
    completed: details.isCompleted,
    userId:req.user.id,
    createdAt: details.createdAt,
  });
};
var getTodo = async (req, res) => {
  const {email} = req.user;
  console.log(email);
  const details = await Todo.findAll({ where: { userEmail: email } });
  console.log(details)
  if (details) {
    details.map((data)=>{
      res.send({email:data.userEmail,Task:data.Task, completed:data.isCompleted, createdAt:data.createdAt})
    })
  }
};
module.exports = {
  createTodo,
  getTodo,
};