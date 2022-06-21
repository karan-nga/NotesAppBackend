const notesModel=require('../models/note');

//CRUD 
 const createNote=async (req,res)=> {
        const{title,description}=req.body
        const newNote=new notesModel({
            title:title,
            description:description,
            userId:req.userId
        })
        try {
            await newNote.save();
            res.status(200).json(newNote);
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Something went wrong"})
        }
 }


 const updateNote=async (req,res)=> {
        const id=req.params.id;
        const{title,description}=req.body;
        const newNote={
            title:title,
            description:description,
            userId:res.userId
        }
         try {
            await notesModel.findByIdAndUpdate(id,newNote,{new: true})
         } catch (error) {
            console.log(error)
            res.status(500).json({message:"Something went wrong"})
         }
        }

 const deleteNote=async (req,res)=> {
    const id=req.params.id;
    try {
        const note =await notesModel.findByIdAndRemove(id);
        res,status(202).json({message:note})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
 }



 const getNote=async (req,res)=> {
    try {
        const notes=await notesModel.find({userId:req.userId})
        res.status(200).json(notes);
    } catch (error) {
        
    }
 }

 module.exports={
    createNote,
    updateNote,
    deleteNote,
    getNote
 }