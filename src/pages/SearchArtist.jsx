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
  };
   {/* if result.images[0] is undefined, accessing result.images[0].url will throw an error  */}
                      {/* To fix this, you can use optional chaining (?.) to safely access the
                       url property only if result.images[0] exists. */}

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <h3 className="text-3xl font-bold mb-8">Search Artist</h3>
        <div className="flex items-center mb-8">
          <input
            type="text"
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter artist name"
            className="w-full px-4 py-2 bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleArtistSearchSubmit}
            className="px-6 py-2 bg-green-500 text-white rounded-r-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchResults &&
            searchResults.map((result, index) => (
              <Link
                key={index}
                to={`/addAlbum/${result.id}`}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <div
                  onClick={() => {
                    setArtistId(result.id);
                  }}
                  className="cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={result.images?.[0]?.url || ""}
                      alt={result.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                  </div>
                  <div className="p-6">
                    <p className="text-xl font-semibold">{result.name}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchArtist;
