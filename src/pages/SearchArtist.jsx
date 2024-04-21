import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const SearchArtist = () => {
  const [userInput, setUserInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [artistId, setArtistId] = useState("");

  const handleArtistSearchSubmit = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${userInput}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    setSearchResults(data.artists.items);
    console.log("SEARCH RESULTS", data.artists);
  };

  return (
    <>
      <div>
        <h3>Search Artist</h3>
        <input type="text" onChange={(e) => setUserInput(e.target.value)} />
        <button onClick={handleArtistSearchSubmit}>Search</button>
        <div>
          <ul>
            {searchResults &&
              searchResults.map((result, index) => {
                return (
                  <Link key={index} to={`/addAlbum/${result.id}`}>
                    <li
                      onClick={() => {
                        console.log(result.id);
                        setArtistId(result.id);
                      }}
                    >
                      {result.name}
                      {/* if result.images[0] is undefined, accessing result.images[0].url will throw an error  */}
                      {/* To fix this, you can use optional chaining (?.) to safely access the
                       url property only if result.images[0] exists. */}
                      <img
                        src={result.images?.[0]?.url || ""}
                        width="300px"
                      ></img>
                    </li>
                  </Link>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchArtist;
