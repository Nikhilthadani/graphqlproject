import mongoose, { Schema, SchemaType } from "mongoose";

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
export default mongoose.model("User", userSchema);
