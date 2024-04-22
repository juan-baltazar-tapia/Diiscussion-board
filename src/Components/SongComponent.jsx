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

  const handleDelete = async () => {
    // Show a confirmation popup
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    console.log("DELETE");

    if (confirmDelete) {
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
      window.location = "/comments";
    }
    if (confirmDelete && error ) {
        alert("Unable to delete commenet", error)
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
      <button onClick={handleDelete}>
        <img
          className="edit-icon"
          alt="delete button"
          src="/src/assets/delete.png"
          width="20px"
        />
      </button>
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
