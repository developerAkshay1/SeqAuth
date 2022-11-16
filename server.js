const express = require("express");
const app = express();
const port = 8000;
var bodyParser = require("body-parser");
require("./model/index");
var credentials = require('./controller/userAuth')
const authenticate = require("./middleware/authentication");
const todoController = require("./controller/todoController")
const Associations = require("./controller/Associations")
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worldd");
});

app.post("/signup",credentials.addUser);
app.get("/login", credentials.loginauthenticateduser);
app.get("/getuser", authenticate.authentication,credentials.getuser)
app.post("/createtodo", authenticate.authentication,todoController.createTodo);
app.get('/gettodos',authenticate.authentication,todoController.getTodo)
// Associations
app.get("/oneTOone",  Associations.oneTOone);
app.get("/oneToMany", authenticate.authentication,Associations.oneToMany);
app.get("/ManytoMany", authenticate.authentication, Associations.ManytoMany);


app.listen(port, () => console.log(`app is litening to the port ${port}`));
