import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

const CommentComponent = ({ content, title, songId, commentId }) => {

  const [time, setTime] = useState("");
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    const fetchCommentData = async () => {
      const { data } = await supabase
        .from("comments")
        .select()
        .eq("id", commentId);
   
      setUpvotes(data[0].upvotes);
      setTime(data[0].created_at);
    };

    fetchCommentData();
  }, [commentId]);

  const handleClick = async () => {
    const newUpvotes = upvotes + 1;
    const { data, error } = await supabase
      .from("comments")
      .update({ upvotes: newUpvotes })
      .eq("id", commentId)
      .select();

    if (error) {
      console.error("Error updating comment upvotes:", error);
    } else {
      setUpvotes(newUpvotes);
      console.log("Comment upvotes updated successfully");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmDelete) {
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
      window.location = "/comments";
    }

    if (confirmDelete && error) {
      alert("Unable to delete comment", error);
    }
  };

  const timeAgo = (timestamp) => {
    // Parse the timestamp string into a Date object
    const createdAt = new Date(timestamp);

    // Get the current datetime
    const now = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = now.getTime() - createdAt.getTime();

    // Calculate the difference in seconds, minutes, hours, and days
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Generate the string representation
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow relative">
      <div className="absolute top-4 right-4 flex space-x-2">
        <Link
          to={"/edit/" + commentId}
          className="text-green-500 hover:text-green-600"
        >
          <img
            className="edit-icon"
            alt="edit button"
            src="/src/assets/more.png"
            width="25px"
          />
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600"
        >
          <img
            className="delete-icon"
            alt="delete button"
            src="/src/assets/delete.png"
            width="25px"
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>

      <p className="text-white mb-4">{content}</p>
      <p className="text-gray-400">Created {timeAgo(time)}</p>
      <button
        onClick={async () => {
          await handleClick();
        }}
        className="flex items-center text-green-500 hover:text-green-600"
      >
        <img
          className="upvote-icon"
          alt="upvote-button"
          src="/src/assets/upvote.jpg"
          width="20px"
        />

        <span className="font-bold">{upvotes}</span>
      </button>
    </div>
  );
};

export default CommentComponent;
