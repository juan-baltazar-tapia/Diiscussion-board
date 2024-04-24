import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import NavBar from "./Components/NavBar";
import AddAlbum from "./pages/AddAlbum";
import Album from "./Components/Album";
import SearchArtist from "./pages/SearchArtist";
import Song from "./Components/Song";
import MakeComment from "./pages/MakeComment";
import EditComment from "./pages/EditComment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import ViewComments from "./pages/ViewComments";
import ViewSongs from "./pages/ViewSongs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-artist" element={<SearchArtist />} />
          <Route path="/addAlbum/:artistId" element={<AddAlbum />} />
          <Route path="/album/:id/:title" element={<Album />} />
          <Route path="/album/:songId" element={<Song />} />
          <Route path="/addComment/:songId" element={<MakeComment />} />
          <Route path="/comments" element={<ViewComments />} />
          <Route path="/edit/:commentId" element={<EditComment />} />
          <Route path="/viewsongs/:albumId" element={<ViewSongs />} />
          
          {/* <Route path="/create" element={<CreatePokemon />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
