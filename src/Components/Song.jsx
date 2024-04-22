import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { Link } from "react-router-dom";

const Song = () => {
  const { songId } = useParams();
  const [songData, setSongData] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchSongData = async () => {
      const { data } = await supabase.from("songs").select().eq("id", songId).order('created_at', {ascending: false});
      console.log("data", data);
      setSongData(data[0]);
      setUpvotes(data[0].upvotes);
    };

    const fetchComments = async () => {
      const { data } = await supabase
        .from("comments")
        .select()
        .eq("song_id", songId);
      console.log("COMMENTS", data);
      setComments(data[0]);
    };

    fetchSongData();
    fetchComments();
  }, [songId]);

  const handleClick = async () => {
    const newUpvotes = upvotes + 1;
    const { data, error } = await supabase
      .from("songs")
      .update({ upvotes: newUpvotes })
      .eq("id", songId)
      .select();

    if (error) {
      console.error("Error updating upvotes:", error);
    } else {
      setUpvotes(newUpvotes);
      console.log("Upvotes updated successfully");
    }
  };

  const millisecondToMinutes = () => {
    const milli = songData.duration;
    const seconds = Math.floor(milli / 1000);
    const minutes = Math.floor(seconds / 60);
    let final_seconds = seconds % 60;

    if (final_seconds / 10 < 1) {
      final_seconds = "0" + final_seconds.toString();
    }
    return `${minutes}:${final_seconds}`;
  };

  return (
    <div>
      <h1>{songData ? songData.title : <p>Loading...</p>}</h1>
      <h2>{songData && millisecondToMinutes()}</h2>
      <button
        onClick={async () => {
          await handleClick();
        }}
      >
        {upvotes}
      </button>
      <Link to={`/addComment/${songId}`}>
        <button>Add Comment</button>
      </Link>
      <h2>Comments</h2>
      {comments}
    </div>
  );
};

export default Song;
