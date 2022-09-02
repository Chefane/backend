const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: {},
  surname: {},
  village: {},
  phoneNo: {},
  email: {},
  password:{},





name: {
  type: String,
  required: [true, "Please provide an Email"],
},

surname: {
  type: String,
  required: [true, "Please provide an Surname"],
},
village: {
  type: String,
  required: [true, "Please provide  Village"],
},
phoneNo: {
  type: Number,
  required: [true, "Please provide phone number"],
},
    
email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
})
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);