import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link, useParams } from "react-router-dom";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const AddAlbum = () => {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState("");
  const [songs, setSongs] = useState([]);

  const [albumInfo, setAlbumInfo] = useState({
    name: "",
    label: "",
    album_cover: "",
    release_date: "",
    total_tracks: "",
    arist_link: "",
    album_link: "",
  });

  const getAlbumInfo = async () => {
    console.log("ALBUM ID", albumId);
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
      name: data.artists[0].name,
      label: data.label,
      album_cover: data.images[0].url,
      release_date: data.release_date,
      total_tracks: data.total_tracks,
      arist_link: data.artists[0].uri,
      album_link: data.external_urls.spotify,
    });
    setSongs(data.tracks.items);
    console.log("SONGS", songs);
  };

  const addAlbum = () => {
    console.log("ALBUM ID", albumId);

    // const { data } = await supabase
    //   .from("artists")
    //   .eq("name", data.name)
    //   .select();
    // console.log("selecting artist from table", data);
  };

  //if its empty, add this artists
  // else, get that artists id, and add this album, with artist_id referencing that
  // artist uuid

  //   await supabase.from("albums").insert({
  //     title: data.name,
  //     label: data.label,
  //     album_cover: data.album_cover,
  //     release_date: data.release_date,
  //     total_tracks: data.total_tracks,
  //     arist_link: data.arist_link,
  //     album_link: data.album_link,
  //     artist_id:
  //   });
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Submit button clicked");
  //   if (post.name && post.type && post.color) {
  //     await supabase
  //       .from("Pokemon")
  //       .insert({ type: post.type, name: post.name, color: post.color })
  //       .select();
  //     window.location = "/view";
  //   } else {
  //     alert("Please fill out all attributes");
  //   }
  // };
  // https://api.spotify.com/v1/albums/
  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      //filter only albums
      setAlbums(data.items.filter((item) => item.album_group === "album"));
    };
    fetchAlbums();
  }, []);

  return (
    <>
      <h2>Select Album</h2>
      <div>
        <ul>
          {albums ? (
            albums.map((album, index) => {
              return (
                <li key={index}>
                  {album.name}
                  <img
                    src={album.images?.[0]?.url || ""}
                    width="100px"
                    alt="Album Name and Cover"
                  />
                  <button
                    onClick={() => {
                      setAlbumId(album.id);

                      getAlbumInfo();
                    }}
                  >
                    Add Album
                  </button>
                </li>
              );
            })
          ) : (
            <p>This artist does not have any albums</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default AddAlbum;
