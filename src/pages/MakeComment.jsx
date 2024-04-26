import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../client";
import { useEffect } from "react";

const MakeComment = () => {
  const { songId } = useParams();
  const [userInput, setUserInput] = useState("");
  const [upvotes, setUpvotes] = useState(0);
  const [userTitle, setUserTitle] = useState("");

  useEffect(() => {
    const fetchNumberOfComments = async () => {
      const { data } = await supabase.from("songs").select().eq("id", songId);
      setUpvotes(data[0].comments);
    };

    fetchNumberOfComments();
    
  }, [songId]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleTitleChange = (e) => {
    setUserTitle(e.target.value);
  };

  const handleSubmit = async () => {
    const newCommentsNumber = upvotes + 1;
    if (userTitle !== "" && userInput !== "") {
      const { data, error } = await supabase
        .from("comments")
        .insert({ title: userTitle, content: userInput, song_id: songId })
        .select();
      if (error) {
        console.error("Error adding comment:", error);
      } else {
        //update comments
        console.log("comment added")

        const { data, error } = await supabase
        .from("songs")
        .update({ comments: newCommentsNumber })
        .eq("id", songId)
        .select();
        if (error){
          console.error("Error updating comments number", error);
        } else {
          console.log("Comments number updated succesfuly")
          window.location.href='/'
        }
      }
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Make a Comment</h1>
      
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            onChange={handleTitleChange}
            value={userTitle}
            placeholder="Enter Title"
            className="w-full bg-gray-800 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-lg font-medium mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            onChange={handleChange}
            value={userInput}
            placeholder="Enter comment"
            rows={5}
            className="w-full bg-gray-800 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default MakeComment;