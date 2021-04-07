import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  songs,
}) => {
  const SongClickHandler = async () => {
    const newSongs = songs.map((songg) => {
      if (songg.id === song.id) {
        return { ...songg, active: true };
      } else {
        return { ...songg, active: false };
      }
    });
    await setSongs(newSongs);
    await setCurrentSong(song);
    playAudio(isPlaying, audioRef);
  };
  return (
    <div
      onClick={SongClickHandler}
      className={`library__song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="library__song__description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
