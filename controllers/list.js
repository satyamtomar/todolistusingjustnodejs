const List = require("../models/list");
const { validationResult } = require("express-validator");

module.exports = {
  fetchlist: async (req, res) => {
    try {
      const lists = await List.find();
      res.json(lists);
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },

  addlist: async (req, res) => {
    try {
      const { title, description } = req.body;
      //if there are errors, returns bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const list = new List({
        title,
        description,
        checked: false,
      });
      const savedlist = await list.save();
      res.json(savedlist);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },

  updatelist: async (req, res) => {
    const { title, description, checked } = req.body;

    try {
      //Create a newlist object
      const newlist = {};

      if (title) {
        newlist.title = title;
      }
      if (description) {
        newlist.description = description;
      }
      if (checked !== undefined) {
        newlist.checked = checked;
      }

      //Find the list to be updated and update it
      let list = await List.findById(req.params.id);
      if (!list) {
        res.status(404).send("Not Found");
      }


      list = await List.findByIdAndUpdate(
        req.params.id,
        { $set: newlist },
        { new: true }
      );

    //   console.log({ list });
      res.json({ list });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },

  deletelist: async (req, res) => {
    try {
      //Find the list to be deleted and delete it
      let list = await List.findById(req.params.id);
    //   console.log("helloo delete", list);
      if (!list) {
        res.status(404).send("Not Found");
      }

      //Allow deletion only if user owns the list

      list = await List.findByIdAndDelete(req.params.id);
    //   console.log("delle", list);
      res.json({ Success: "list has been deleted", list: list });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },
};
