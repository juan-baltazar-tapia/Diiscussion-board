import React, { useState } from "react";
import { supabase } from "../client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

const HomePage = () => {
  // display all albums
  // selecting all albums
  const [albums, setAlbums] = useState([]);

  const handleClick = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });
    const data = await response.json();

    console.log("ACEESS TOKEN", data.access_token);
    return data.access_token;
  };

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
      <h2>Get access token</h2>
      <button onClick={handleClick}>Get token</button>
      <h2>Latest Discussion</h2>
      <ul>
        {albums &&
          albums.map((album, index) => {
            return (
              <Link key={index} to={`/album/${album.id}/${album.album_name}`}>
                <li>
                  {album.album_name}
                  <img src={album.album_cover} width="200px" alt="" />
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
};

export default HomePage;
