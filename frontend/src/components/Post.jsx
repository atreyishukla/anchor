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

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState(post.comments || []);
	const isOwner = authUser && post.author && authUser._id === post.author._id;
	const isLiked = authUser && post.likes.includes(authUser._id);

	const queryClient = useQueryClient();

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
			console.error("Review addition error:", errorMessage);
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

	const { mutate: voteOnComment, isPending: isVotingOnComment } = useMutation({
		mutationFn: async ({ commentId, action }) => {
			await axiosInstance.post(`/posts/${post._id}/comments/${commentId}/${action}`);
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", post._id] });
			const action = variables.action === "like" ? "Liked" : "Disliked";
			toast.success(`${action} the comment successfully!`);
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

	const handleVoteOnComment = async (commentId, action) => {
		if (isVotingOnComment) return;
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
					content: newComment,
					user: {
						_id: authUser._id,
						name: authUser.name,
						profilePicture: authUser.profilePicture,
					},
					createdAt: new Date(),
					likes: [],
					dislikes: [],
				},
			]);
		}
	};

	return (
		<div className="bg-accent font-primary rounded-lg shadow mb-4">
			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center">
						<Link to={`/profile/${post?.author?.username}`}>
							<img
								src={post?.author?.profilePicture || "/avatar.png"}
								alt={post?.author?.name || "Author"}
								className="size-10 rounded-full mr-3"
							/>
						</Link>

						<div>
							<Link to={`/profile/${post?.author?.username}`}>
								<h3 className="font-semibold">{post?.author?.name}</h3>
							</Link>
							<p className="text-xs text-info">{post?.author?.headline}</p>
							<p className="text-xs text-info">
								{formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}
							</p>
						</div>
					</div>
					{isOwner && (
						<button onClick={handleDeletePost} className="text-red-500 hover:text-red-700">
							{isDeletingPost ? <Loader size={18} className="animate-spin" /> : <Trash2 size={18} />}
						</button>
					)}
				</div>
				<p className="mb-4">{post?.content}</p>
				{post?.image && <img src={post.image} alt="Post content" className="rounded-lg w-full mb-4" />}

				<div className="flex justify-between text-info">
					<PostAction
						icon={<ThumbsUp size={18} className={isLiked ? "text-blue-500  fill-blue-300" : ""} />}
						text={`Like (${post.likes.length})`}
						onClick={handleLikePost}
					/>

					<PostAction
						icon={<MessageCircle size={18} />}
						text={`Comments (${comments.length})`}
						onClick={() => setShowComments(!showComments)}
					/>
					<PostAction icon={<Share2 size={18} />} text="Share" />
				</div>
			</div>

			{showComments && (
				<div className="px-4 pb-4">
					<div className="mb-4 max-h-60 overflow-y-auto">
						{comments.map((comment) => {
							const isCommentLiked = comment.likes.includes(authUser._id);
							const isCommentDisliked = comment.dislikes.includes(authUser._id);
							
							return (
								<div key={comment._id} className="mb-2 bg-base-100 p-2 rounded flex items-start">
									<img
										src={comment.user.profilePicture || "/avatar.png"}
										alt={comment.user.name}
										className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
									/>
									<div className="flex-grow">
										<div className="flex items-center mb-1">
											<span className="font-semibold mr-2">{comment.user.name}</span>
											<span className="text-xs text-info">
												{formatDistanceToNow(new Date(comment.createdAt))}
											</span>
										</div>
										<p>{comment.content}</p>
									</div>
									<PostAction
										icon={<ThumbsUp size={18} className={isCommentLiked ? "text-blue-500 fill-blue-300" : ""} />}
										text={`Like (${comment.likes.length})`}
										onClick={() => handleVoteOnComment(comment._id, "like")}
									/>
									<PostAction
										icon={<ThumbsDown size={18} className={isCommentDisliked ? "text-red-500 fill-red-300" : ""} />}
										text={`Dislike (${comment.dislikes.length})`}
										onClick={() => handleVoteOnComment(comment._id, "dislike")}
									/>
								</div>
							);
						})}
					</div>

					<form onSubmit={handleAddComment} className="flex items-center">
						<input
							type="text"
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder="Add a comment..."
							className="flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none"
						/>

						<button
							type="submit"
							className="bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300"
							disabled={isAddingComment}
						>
							{isAddingComment ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Post
