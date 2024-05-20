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
    console.log(data.access_token);
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
  {
    /* <h2>Get access token</h2>
      <button onClick={handleClick}>Get token</button> */
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Get token
      </button>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Latest Discussion</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {albums &&
            albums.map((album, index) => (
              <Link
                key={index}
                to={`/album/${album.id}/${album.album_name}`}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={album.album_cover}
                    alt={album.album_name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {album.album_name}
                  </h2>
                  <p className="text-gray-400">{album.artist_name}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
