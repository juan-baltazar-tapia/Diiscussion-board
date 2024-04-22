import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useParams, Link } from "react-router-dom";
import { supabase } from "../client";

const Album = ({album_title}) => {
  const [songs, setSongs] = useState(null);
  const { id, title } = useParams();
  console.log("ID Param:", id, title);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("songs").select().eq("album_id", id);

      setSongs(data);
      console.log("songs:", data);
    };
    fetchData();
  }, []);

  return (
    <div>
        <h1>{title}</h1>
      <ul>
        {songs &&
          songs.map((song, index) => {
            return (
              <Link key={index} to={`/album/${song.id}`}>
                <li>{song.title}</li>
              </Link>
            )
            // return <li key={song.id}>{song.title}</li>;
          })}
      </ul>
    </div>
  );
};

export default Album;
