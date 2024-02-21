const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
};
