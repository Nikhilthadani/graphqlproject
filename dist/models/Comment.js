import mongoose, { model, Schema } from "mongoose";
const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
    },
});
export default model("Comment", commentSchema);
//# sourceMappingURL=Comment.js.map