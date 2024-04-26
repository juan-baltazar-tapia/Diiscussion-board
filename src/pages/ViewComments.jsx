import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../client";
import SongComponent from "../Components/SongComponent";

const ViewComments = () => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("comments").select();
      setComments(data);

    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">All Comments</h1>
        <ul className="grid grid-cols-1 gap-8 ">
          {comments &&
            comments.map((comment, index) => {
              return (
              
                <li key={index} className="bg-gray-800 rounded-lg shadow-lg">
                  <SongComponent
                    content={comment.content}
                    title={comment.title}
                    songId={comment.song_id}
                    commentId={comment.id}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ViewComments;