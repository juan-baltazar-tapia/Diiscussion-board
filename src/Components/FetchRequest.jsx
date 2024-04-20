import React, { useEffect, useState } from "react";
const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const FetchRequest = () => {
  const [albumId, setAlbumId] = useState("");

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

  const getAlbumInfo = async (albumID) => {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json()
    console.log("DATA", data)
    
  };

  
  return (
    <>
      <div>
        <button onClick={handleClick}>Click to get Access Token</button>
      </div>
      <div>
        <h3>Input Album ID</h3>
        <input type="text" onChange={(e) => setAlbumId(e.target.value)} />
        <button onClick={getAlbumInfo}>Get Album Info</button>
      </div>
    </>
  );
};

export default FetchRequest;
