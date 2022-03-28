const express =require("express");

const app = express();

app.use(express.json());


const {register,login}=require("./controllers/auth.controller")
const usersController = require("./controllers/user.controller");
const todoController = require("./controllers/todo.controller");



app.use("/users", usersController);


app.post("/register",register);
app.post("/login",login);

app.use("/todos",todoController)

module.exports=app;