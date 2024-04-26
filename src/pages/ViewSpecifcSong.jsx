import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../client";

const ViewSpecifcSong = () => {
  const { commentId } = useParams();
  const [comment, setComment] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [songId, setSongId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("id", commentId);
      console.log("data from comment", data);
      if (error) {
        console.log("error", error);
      } else {
        setComment(data[0]);
        setUpvotes(data[0].upvotes);
        setSongId(data[0].song_id)
      }
    };

    fetchData();
  }, [commentId]);

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

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {comment && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-4">{comment.title}</h1>
            <p className="text-gray-400 mb-4">
              Created {timeAgo(comment.created_at)}
            </p>
            <p className="text-lg mb-6">{comment.content}</p>
            <div className="flex items-center">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSpecifcSong;
