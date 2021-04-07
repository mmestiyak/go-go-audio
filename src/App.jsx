import React, { useState, useRef } from "react";
import "./styles/app.scss";

// IMPORT COMPONENTS
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

// IMPORT DATA
import data from "./data";
import Navbar from "./components/Navbar";

const App = () => {
  const audioRef = useRef();
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  return (
    <div className={`app ${isLibraryOpen ? "library-active" : ""}`}>
      <Navbar
        setIsLibraryOpen={setIsLibraryOpen}
        isLibraryOpen={isLibraryOpen}
      />
      <Song {...currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        isLibraryOpen={isLibraryOpen}
      />
      <p
        style={{
          textAlign: "center",
          padding: "4em 1em 1em 1em",
          fontFamily: `'Comfortaa', cursive`,
          color: "#3e3e3e",
          fontSize: "1.2rem",
        }}
      >
        Created With 💛 by
        <a
          target="_blank"
          style={{
            textDecoration: "none",
            color: "crimson",
            marginLeft: ".5rem",
          }}
          href="https://facebook.com/mmestiyak"
          rel="noreferrer"
        >
          mmestiyak
        </a>
      </p>
    </div>
  );
};

export default App;
