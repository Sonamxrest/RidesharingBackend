const { Int32 } = require("bson");
const mongoose = require("mongoose");

const User = mongoose.model("User", {
  FullName: { type: String },

  DateOfBirth: { type: String },

  Password: { type: String },

  PhoneNumber: { type: String },

  UserType: {type: String},

  RewardPoint: {type: Number},

  TotalIncome: {type: Number}
});

module.exports = User;
