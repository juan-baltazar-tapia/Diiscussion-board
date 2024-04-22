import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

const SongComponent = ({ content, title, songId, commentId }) => {
  const [songName, setSongName] = useState("");
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    const fetchSongTitle = async () => {
      const { data } = await supabase
        .from("songs")
        .select()
        .eq("id", songId)
        .single();
      setSongName(data.title);
    };
    const fetchCommentData = async () => {
      const { data } = await supabase
        .from("comments")
        .select()
        .eq("id", commentId);

      setUpvotes(data[0].upvotes);
    };

    fetchSongTitle();
    fetchCommentData();
  }, []);

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
    <div>
      <h2>{title}</h2>
      <Link to={"/edit/" + commentId} className="edit-button">
        <img
          className="edit-icon"
          alt="edit button"
          src="/src/assets/more.png"
          width="20px"
        />
      </Link>
      <h3>On the song {songName}</h3>
      <p>{content}</p>
      <p>Created ....TODO</p>
      <button
        onClick={async () => {
          await handleClick();
        }}
      >
        {upvotes}
      </button>
    </div>
  );
};

export default SongComponent;
