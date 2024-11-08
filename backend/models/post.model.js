import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		content: { type: String },
		image: { type: String },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array to store users who liked the post
		comments: [
			{
				content: { type: String, required: true }, // Comment content
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Comment author
				createdAt: { type: Date, default: Date.now },
				likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array to store users who liked the comment
				dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array to store users who disliked the comment
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
