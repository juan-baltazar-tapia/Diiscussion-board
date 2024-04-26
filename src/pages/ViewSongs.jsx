import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const ViewSongs = () => {
  const { albumId } = useParams();
  const [songs, setSongs] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const [albumInfo, setAlbumInfo] = useState({
    album_name: "",
    artist_name: "",
    label: "",
    album_cover: "",
    release_date: "",
    total_tracks: "",
    artist_link: "",
    album_link: "",
  });

  useEffect(() => {
    const fetchAlbumInfo = async (id) => {
      console.log("ALBUM ID", id);
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log("DATA", data);
      setAlbumInfo({
        artist_name: data.artists[0].name || "",
        album_name: data.name || "",
        label: data.label || "",
        album_cover: data.images[0].url || "",
        release_date: data.release_date || "",
        total_tracks: data.total_tracks || "",
        artist_link: data.artists[0].uri || "",
        album_link: data.external_urls.spotify || "",
      });
      console.log("SONGS", data.tracks.items);
      setSongs(data.tracks.items);
      //console.log("SONGS", songs);
    };
    fetchAlbumInfo(albumId);
  }, []);

  const convertMillisecondsToMinutes = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">{albumInfo.name}</h3>
      <ul className="mb-8 space-y-4">
        {songs &&
          songs.map((song, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
            >
              <div>
                <h4 className="text-lg font-semibold">{song.name}</h4>
                <p className="text-gray-400">
                  {convertMillisecondsToMinutes(song.duration_ms)}
                </p>
              </div>
      
            </li>
          ))}
      </ul>
  
    </div>
  );
};

export default ViewSongs;
