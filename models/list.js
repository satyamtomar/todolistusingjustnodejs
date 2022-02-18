const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    
  },
  checked:
  {
      type:Boolean,
      default:false,
  }
});

//const List = mongoose.model("list", listSchema);

module.exports = mongoose.model("list", listSchema);
