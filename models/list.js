const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
    
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

module.exports = mongoose.model("listing", listSchema);
