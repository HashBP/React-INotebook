const express = require("express");
const router = express.Router();
const Notes = require("./../models/Notes");
const fetchUser = require("../middleware/fetchUser");

router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    let notes = await Notes.find({ user: req.user.id });
    res.status(200).json({
      Number_of_notes: notes.length,
      notes: notes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post("/addNote", fetchUser, async (req, res) => {
  try {
    const note = await Notes.create({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user: req.user.id,
    });
    res.status(200).json({ note: note });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You are not authorized to do this" });
    }

    const updatedNote=await Notes.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ note: updatedNote });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You are not authorized to do this" });
    }
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
