const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
    
  
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
