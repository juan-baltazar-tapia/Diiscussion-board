import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const EditComment = () => {
  const { commentId } = useParams();
  const [data, setData] = useState({
    content: "",
    created_at: "",
    id: "",
    song_id: "",
    title: "",
    upvotes: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("comments").select().eq("id", commentId);
      console.log(data[0]);
      setData(data[0]);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (data.title !== "" && data.content !== "") {
      await supabase
        .from("comments")
        .update({ content: data.content, title: data.title })
        .eq("id", commentId)
        .select();
      window.location = "/comments";
    } else {
      alert("Please fill out all attributes");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Edit Comment</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Title</h2>
          <input
            name="title"
            type="text"
            onChange={handleChange}
            value={data.title}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-6"
          />
          <h2 className="text-2xl font-bold text-white mb-4">Comment</h2>
          <textarea
            name="content"
            id="comment"
            onChange={handleChange}
            cols="50"
            rows="10"
            value={data.content}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-6"
          ></textarea>
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComment;