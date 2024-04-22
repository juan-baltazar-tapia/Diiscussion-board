import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../client";

const MakeComment = () => {
  const { songId } = useParams();
  const [userInput, setUserInput] = useState("");
  const [userTitle, setUserTitle] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleTitleChange = (e) => {
    setUserTitle(e.target.value);
  };

  const handleSubmit = async () => {
    if (userTitle !== "" && userInput !== "") {
      const { data, error } = await supabase
        .from("comments")
        .insert({ title: userTitle, content: userInput, song_id: songId })
        .select();

      if (error) {
        console.error("Error adding comment:", error);
      } else {
        window.location = "/";
      }
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <div>
      <p>Song Id {songId}</p>
      <label htmlFor="title"></label>
      <input
        type="text"
        id="title"
        onChange={handleTitleChange}
        value={userTitle}
        placeholder="Enter Title"
      />
      <textarea
        id="comment"
        onChange={handleChange}
        value={userInput}
        placeholder="Enter comment"
        rows={5}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit Comment</button>
    </div>
  );
};

export default MakeComment;
