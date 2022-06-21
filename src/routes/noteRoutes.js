const express=require("express");
const { getNote, createNote, deleteNote, updateNote} =  require("../controllers/noteContoller");
const noteRouter=express.Router();
const auth=require("../middleware/authMiddleware") 


noteRouter.get("/",auth,getNote);

noteRouter.post("/",auth,createNote);

noteRouter.delete("/:id",auth,deleteNote);

noteRouter.put("/:id",auth,updateNote);

module.exports=noteRouter;