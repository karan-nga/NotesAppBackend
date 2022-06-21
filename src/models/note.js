const mongoose=require('mongoose');
const noteSchema=mongoose.Schema({
    title: {
        type: 'string',
        required: true
    }
    ,
    description: {
        type: 'string',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }

},{timeStamp:true});
module.exports=mongoose.model("Note",noteSchema)