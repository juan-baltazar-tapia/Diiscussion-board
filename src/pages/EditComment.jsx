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
      const { data } = await supabase
        .from("comments")
        .select()
        .eq("id", commentId);
      console.log(data[0]);
      setData(data[0]);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
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
      //console.log(post);

      window.location = "/comments";
    } else {
      alert("Please fill out all attributes");
    }
  };

  return (
    <div>
      <h1>Edit Comment</h1>
      <h2>Title</h2>
      <input
        name="title"
        type="text"
        onChange={handleChange}
        value={data.title}
      />
      <h2>Comment</h2>
      <textarea
        name="content"
        id="comment"
        onChange={handleChange}
        cols="50"
        rows="10"
        value={data.content}
      ></textarea>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditComment;
