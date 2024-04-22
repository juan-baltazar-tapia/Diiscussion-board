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
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>All Comments</h1>
      <ul>
        {comments &&
          comments.map((comment, index) => {
            return (
              <SongComponent
                content={comment.content}
                title={comment.title}
                songId={comment.song_id}
                commentId = {comment.id}
            
              />
            );
          })}
      </ul>
    </div>
  );
};

export default ViewComments;
