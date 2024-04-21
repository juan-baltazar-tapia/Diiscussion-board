import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link, useParams } from "react-router-dom";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const AddAlbum = () => {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

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

  const getAlbumInfo = async (id) => {
    console.log("ALBUM ID", id);
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
    setSongs(data.tracks.items);
    //console.log("SONGS", songs);
  };

  const addAlbum = async () => {
    try {
      // Check if the artist already exists in the "artists" table
      console.log("artist name", albumInfo);
      const { data: existingArtist, error: selectError } = await supabase
        .from("artists")
        .select("id, name")
        .eq("name", albumInfo.artist_name)
        .limit(1);

      if (selectError) {
        throw selectError;
      }

      console.log("EXISTING ARTIST", existingArtist);

      let artistId;

      if (existingArtist.length === 0) {
        console.log("Artist does not exists");
        // If the artist doesn't exist, insert a new artist and get the ID
        const { data: newArtist, error: insertError } = await supabase
          .from("artists")
          .insert({ name: albumInfo.artist_name })
          .select("id")
          .single();

        if (insertError) {
          throw insertError;
        }
        console.log("NEW ARTIST", newArtist);

        artistId = newArtist[0].id;
      } else {
        // If the artist exists, use the existing artist ID
        artistId = existingArtist[0].id;
      }
      console.log("ARTIST ID", artistId);

      // Insert the album into the "albums" table with the artist ID
      const { data: album, error: albumError } = await supabase
        .from("albums")
        .insert({
          album_name: albumInfo.album_name,
          artist_name: albumInfo.artist_name,
          label: albumInfo.label,
          album_cover: albumInfo.album_cover,
          release_date: albumInfo.release_date,
          total_tracks: albumInfo.total_tracks,
          artist_link: albumInfo.artist_link,
          album_link: albumInfo.album_link,
          artist_id: artistId,
        })
        .select("id");

      console.log("ALBUM ID", album);

      if (albumError) {
        throw albumError;
      }
      //ADD SONGS
      const albumId = album[0].id;
      const songsData = songs.map((song) => ({
        album_id: albumId,
        title: song.name,
        preview_url: song.preview_url,
        // Add other song properties as needed
        upvotes: 0, // Set default upvotes value to 0
        duration: song.duration_ms,
      }));

      // Insert the songs data into the songs table
      const { data: newSongs, error: insertSongsError } = await supabase
        .from("songs")
        .insert(songsData);

      if (insertSongsError) {
        console.error("Error inserting songs:", insertSongsError);
        return null;
      }

      // Album added successfully
      console.log("Album added successfully");
    } catch (error) {
      console.error("Error adding album:", error);
    }

    // Prepare the songs data with the album UUID and default upvotes value

    // const {  error: albumError } = await supabase
    // .from("songs")
    // .insert({
    //   title: '',
    //   album_id: album.id
    // })
  };
  //console.log(songs)

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
                      getAlbumInfo(album.id);
                    }}
                  >
                    View Album
                  </button>
                </li>
              );
            })
          ) : (
            <p>This artist does not have any albums</p>
          )}
        </ul>
        {albumInfo && albumInfo.name}
        <ul>
          {songs &&
            songs.map((song, index) => {
              return <li key={index}>{song.name}</li>;
            })}
        </ul>
        {albumInfo && <button onClick={addAlbum}>Add Album</button>}
      </div>
    </>
  );
};

export default AddAlbum;
