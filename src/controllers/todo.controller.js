const express= require("express");
const Todo = require("../models/todo.model");

const authenticate= require("../middlewares/authenticate")

const router= express.Router();



router.get("",authenticate,async(req,res)=>{
    try {
     const todo = await Todo.find().lean().exec();

     return res.status(200).send(todo)
        
    } catch (error) {
        return  res.status(400).send({message:error.message});
        
    }
})

router.post("",authenticate,async(req,res)=>{
    try {
     const todos = await Todo.create(req.body);

     return res.status(200).send(todos)
        
    } catch (error) {
        return  res.status(400).send({message:error.message});
        
    }
})
router.get("/:id",authenticate,async(req,res)=>{
    try {
     const todos = await Todo.findById(req.params.id)

     return res.status(200).send(todos)
        
    } catch (error) {
        return  res.status(401).send({message:error.message});
        
    }
})

router.patch("/:id",authenticate,async(req,res)=>{
    try {
     const todos = await Todo.findByIdAndUpdate(req.params.id,req,body,{new:true}).lean().exex();

     return res.status(200).send(todos)
        
    } catch (error) {
        return  res.status(401).send({message:error.message});
        
    }
})
router.delete("",authenticate,async(req,res)=>{
    try {
     const todos = await Todo.findByIdAndDelete(req.params.id);

     return res.status(200).send(todos)
        
    } catch (error) {
        return  res.status(401).send({message:error.message});
        
    }
})


module.exports=router;
