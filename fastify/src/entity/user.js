const mongoose = require("../middleware/mongodb");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
  id: ObjectId,
  name: String,
  age: Number,
  created_time: Date,
  updated_time: Date
});
// mongodb数据库中表名自动加s, 即 users
module.exports = mongoose.model("User", UserSchema);
