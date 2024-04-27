import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

const CommentComponent = ({ commentId }) => {

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
    <div className="bg-gray-800 p-1 rounded-lg  relative">
      <p className="text-gray-400 text-sm mb-4">Created {timeAgo(time)}</p>
      <button
        onClick={async () => {
          await handleClick();
        }}
        className="flex items-center text-green-500 hover:text-green-600 transition duration-200"
      >
        <img
          className="upvote-icon w-5 h-5 mr-2"
          alt="upvote-button"
          src="/src/assets/upvote.jpg"
        />
        <span className="font-bold text-lg">{upvotes}</span>
      </button>
    </div>
  );
};

export default CommentComponent;
