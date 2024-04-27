import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../client";
import SongComponent from "../Components/CommentComponent";
import { Link } from "react-router-dom";

const ViewComments = () => {
  const [comments, setComments] = useState(null);
  const [sortByUpvotes, setSortByUpvotes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let query = supabase.from("comments").select();

      if (sortByUpvotes) {
        query = query.order("upvotes", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        console.log(data);
        setComments(data);
      }
    };

    fetchData();
  }, [sortByUpvotes]);

  const handleClick = () => {
    setSortByUpvotes(!sortByUpvotes);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">All Comments</h1>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-white">
            Sorting by {sortByUpvotes ? "upvotes" : "time created"}
          </h3>
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Toggle Sort
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-8">
          {comments &&
            comments.map((comment, index) => {
              return (
                <Link key={index} to={`/song/${comment.id}`}>
                  <li className="bg-gray-800 rounded-lg shadow-lg">
                    <SongComponent
                      title={comment.title}
                      songId={comment.song_id}
                      commentId={comment.id}
                    />
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ViewComments;
