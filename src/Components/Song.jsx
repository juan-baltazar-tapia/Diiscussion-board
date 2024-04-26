import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const Song = () => {
  console.log("SONG COMPONENT LOADED");
  const { songId } = useParams();
  const [songData, setSongData] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchSongData = async () => {
      const { data } = await supabase.from("songs").select().eq("id", songId);
      setSongData(data[0]);
      setUpvotes(data[0].upvotes);
    };

    const fetchComments = async () => {
      const { data } = await supabase
        .from("comments")
        .select()
        .eq("song_id", songId);

      console.log("COMMENTS DATA", data);
      setComments(data);
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
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            {songData ? songData.title : <p>Loading...</p>}
          </h1>
          <h2 className="text-xl">{songData && millisecondToMinutes()}</h2>
        </div>
        <div className="flex items-center mb-8">
          <button
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-4"
            onClick={async () => {
              await handleClick();
            }}
          >
            {/* <FaThumbsUp className="mr-2" /> */}
            {upvotes}
          </button>
          <Link to={`/addComment/${songId}`}>
            <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              {/* <FaComment className="mr-2" /> */}
              Add Comment
            </button>
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <ul>
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => <Comment title={comment.title} comment={comment.content} created_at={comment.created_at} upvotes={comment.upvotes}/>)
          ) : (
            <p>No comments...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Song;
