const mongooose = require("mongoose");

const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  enrollment: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  session:{
    type: String,
    required :true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const User = mongooose.model("USER", userSchema);

module.exports = User;
