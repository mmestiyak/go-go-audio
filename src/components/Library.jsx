import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  isLibraryOpen,
}) => {
  return (
    <div className={`library ${isLibraryOpen ? "open" : ""}`}>
      <div className="library__songs">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            setCurrentSong={setCurrentSong}
            song={song}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            songs={songs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
