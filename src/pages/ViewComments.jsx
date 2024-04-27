import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../client";
import CommentComponent from "../Components/CommentComponent";
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmDelete) {
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq("id", id);
      window.location = "/comments";
    }

    if (confirmDelete && error) {
      alert("Unable to delete comment", error);
    }
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
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200"
          >
            Toggle Sort
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-8">
          {comments &&
            comments.map((comment, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-4 bg-gray-700">
                  <Link to={`/song/${comment.id}`}>
                    <h2 className="text-2xl font-bold text-white">
                      {comment.title}
                    </h2>
                  </Link>
                  <div className="flex space-x-2">
                    <Link
                      to={"/edit/" + comment.id}
                      className="text-green-500 hover:text-green-600 transition duration-200"
                    >
                      <img
                        className="edit-icon w-6 h-6"
                        alt="edit button"
                        src="/src/assets/more.png"
                      />
                    </Link>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-500 hover:text-red-600 transition duration-200"
                    >
                      <img
                        className="delete-icon w-6 h-6"
                        alt="delete button"
                        src="/src/assets/delete.png"
                      />
                    </button>
                  </div>
                </div>
                <div className="py-2">
                  <CommentComponent
                  search={false}
  
                    commentId={comment.id}
                  />
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewComments;
