import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { supabase } from "../client";

const Album = ({ album_title }) => {
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

  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
        <ul className="space-y-4">
          {songs &&
            songs.map((song, index) => {
              return (
                <Link
                  key={index}
                  to={`/album/${song.id}`}
                  className="block bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md p-4"
                >
                  <li className="text-xl font-semibold text-white mb-2">
                    {song.title}
                  </li>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400">
                      {millisToMinutesAndSeconds(song.duration)}
                    </p>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-400 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-gray-400">{song.comments || "0"}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Album;
