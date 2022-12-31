const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  user:{
   type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  title: {
    type: String,
    required: [true,"Please provide a title"]

  },
  description: {
    type: String,
    required: [true,"Please provide a description."]
},
tag: {
      type: String,
      default:"General"
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Notes", NotesSchema);
