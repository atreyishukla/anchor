import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2, ThumbsDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import PostAction from "./PostAction";

const Post = ({ post }) => {
	const { postId } = useParams();
	const queryClient = useQueryClient();

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState(
		post.comments?.map((comment) => ({
			...comment,
			isLikedByUser: comment.likes.includes(authUser._id),
			isDislikedByUser: comment.dislikes.includes(authUser._id),
		})) || []
	);

	const isOwner = authUser && post.author && authUser._id === post.author._id;
	const isLiked = authUser && post.likes.includes(authUser._id);

	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.delete(`/posts/delete/${post._id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Post deleted successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: createComment, isPending: isAddingComment } = useMutation({
		mutationFn: async (newComment) => {
			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Review added successfully!");
		},
		onError: (err) => {
			const errorMessage = err.response?.data?.message || "Failed to add review";
			toast.error(errorMessage);
			console.error("Comment addition error:", errorMessage);
		},
	});

	const { mutate: likePost, isPending: isLikingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.post(`/posts/${post._id}/like`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", postId] });
			toast.success("Voted successfully!");
		},
	});

	const { mutate: voteOnComment } = useMutation({
		mutationFn: async ({ commentId, action }) => {
			await axiosInstance.post(`/posts/${post._id}/comments/${commentId}/${action}`);
		},
		onMutate: async ({ commentId, action }) => {
			// Optimistically update comment state
			setComments((prevComments) =>
				prevComments.map((comment) =>
					comment._id === commentId
						? {
								...comment,
								likes:
									action === "like"
										? comment.isLikedByUser
											? comment.likes - 1
											: comment.likes + 1
										: comment.likes,
								dislikes:
									action === "dislike"
										? comment.isDislikedByUser
											? comment.dislikes - 1
											: comment.dislikes + 1
										: comment.dislikes,
								isLikedByUser: action === "like" ? !comment.isLikedByUser : comment.isLikedByUser,
								isDislikedByUser: action === "dislike" ? !comment.isDislikedByUser : comment.isDislikedByUser,
						  }
						: comment
				)
			);
		},
		onError: (error) => {
			toast.error("Failed to update review");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});

	const handleDeletePost = () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		deletePost();
	};

	const handleLikePost = async () => {
		if (isLikingPost) return;
		likePost();
	};

	const handleVoteOnComment = (commentId, action) => {
		voteOnComment({ commentId, action });
	};

	const handleAddComment = async (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			createComment(newComment);
			setNewComment("");
			setComments([
				...comments,
				{
					_id: new Date().getTime(),
					content: newComment,
					user: {
						_id: authUser._id,
						name: authUser.name,
						profilePicture: authUser.profilePicture,
					},
					createdAt: new Date(),
					likes: 0,
					dislikes: 0,
					isLikedByUser: false,
					isDislikedByUser: false,
				},
			]);
		}
	};

	return (
		<div className="bg-accent font-primary rounded-lg shadow mb-4">
			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					{/* Post Header */}
				</div>
				<p className="mb-4">{post?.content}</p>
				{post?.image && <img src={post.image} alt="Post content" className="rounded-lg w-full mb-4" />}

				<div className="flex justify-between text-info">
					<PostAction
						icon={<ThumbsUp size={18} className={isLiked ? "text-blue-500 fill-blue-300" : ""} />}
						text={`Vote (${post.likes.length})`}
						onClick={handleLikePost}
					/>
					<PostAction
						icon={<MessageCircle size={18} />}
						text={`Review (${comments.length})`}
						onClick={() => setShowComments(!showComments)}
					/>
					<PostAction icon={<Share2 size={18} />} text="Share" />
				</div>
			</div>

			{showComments && (
				<div className="px-4 pb-4">
					<div className="mb-4 max-h-60 overflow-y-auto">
						{comments.map((comment) => (
							<div key={comment._id} className="mb-2 bg-base-100 p-2 rounded flex items-start">
								{/* Comment Display */}
								<div className="flex">
									<PostAction
										icon={
											<ThumbsUp
												size={18}
												className={comment.isLikedByUser ? "text-blue-500 fill-blue-300" : ""}
											/>
										}
										text={`Like (${comment.likes})`}
										onClick={() => handleVoteOnComment(comment._id, "like")}
									/>
									<PostAction
										icon={
											<ThumbsDown
												size={18}
												className={comment.isDislikedByUser ? "text-red-500 fill-red-300" : ""}
											/>
										}
										text={`Dislike (${comment.dislikes})`}
										onClick={() => handleVoteOnComment(comment._id, "dislike")}
									/>
								</div>
							</div>
						))}
					</div>
					{/* Comment Input Form */}
				</div>
			)}
		</div>
	);
};

export default Post;
