import React from "react";

const Song = ({ name, cover, artist, isPlaying }) => {
  return (
    <div className="song">
      <img
        className={`song__cover ${isPlaying ? "rotating" : ""}`}
        src={cover}
        alt={name}
      />
      <h2 className="song__title">{name}</h2>
      <h2 className="song__artist">{artist}</h2>
    </div>
  );
};

export default Song;
