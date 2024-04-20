import React, { useState } from "react";
import { supabase } from "../client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = () => {
  // display all albums
  // selecting all albums
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("albums")
        .select()
        .order("created_at", { ascending: true });

      setAlbums(data);
      console.log("albums", data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Latest Discussion</h2>
      <ul>
        {albums &&
          albums.map((album) => {
            return (
              <Link to={`/album/${album.id}/${album.title}`} >
                <li key={album.id}>{album.title}</li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
};

export default HomePage;
