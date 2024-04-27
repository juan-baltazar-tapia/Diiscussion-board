import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link, useParams } from "react-router-dom";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const AddAlbum = () => {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [addedAlbum, setAddedAlbum] = useState(false)

  //get all of the artists albums
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

      setAlbums(data.items.filter((item) => item.album_group === "album"));
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (albumInfo && !addedAlbum) {
      addAlbum();
      setAddedAlbum(true)
    }
  }, [albumInfo]);

  const handleClick = async (id) => {
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log("data from handleClick", data);

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
  };

  const addAlbum = async () => {
    //fetchAlbumInfo(id);
    try {
      // Check if the artist already exists in the "artists" table
      console.log("albumInfo from addAlbum()", albumInfo);
      const { data: existingArtist, error: selectError } = await supabase
        .from("artists")
        .select("id, name")
        .eq("name", albumInfo.artist_name)
        .limit(1);

      if (selectError) {
        throw selectError;
      }

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
        
        artistId = newArtist.id;
      } else {
        // If the artist exists, use the existing artist ID
        artistId = existingArtist[0].id;
      }

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

      if (albumError) {
        throw albumError;
      }
      //ADD SONGS
      const albumId = album[0].id;
      const songsData = songs.map((song) => ({
        album_id: albumId,
        title: song.name,
        preview_url: song.preview_url,
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
    window.location = "/";
  };


  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold mb-8">Select Album</h2>
          {albums && albums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {albums.map((album, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={album.images?.[0]?.url || ""}
                      alt="Album Name and Cover"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{album.name}</h3>
                    <Link to={`/viewsongs/${album.id}`}>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-4">
                        View Album
                      </button>
                    </Link>

                    <button
                      onClick={() => handleClick(album.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Add Album
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xl text-gray-400">
              This artist does not have any albums
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddAlbum;
