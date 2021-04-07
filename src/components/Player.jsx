import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { formatTime, playAudio } from "../util";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  useEffect(() => {
    const newSongs = songs.map((songg) => {
      if (songg.id === currentSong.id) {
        return { ...songg, active: true };
      } else {
        return { ...songg, active: false };
      }
    });
    (async () => {
      await setSongs(newSongs);
      await setCurrentSong(currentSong);
    })();
  }, [currentSong]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const skipTrackHandler = (direction) => {
    const findIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[findIndex + 1] || songs[0]);
    }
    if (direction === "skip-back") {
      setCurrentSong(songs[findIndex - 1] || songs[songs.length - 1]);
    }
    playAudio(isPlaying, audioRef);
  };

  const songPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
      audioRef.current.play();
    }
  };
  const songEndHandler = async () => {
    const findIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[findIndex + 1] || songs[0]);
    playAudio(isPlaying, audioRef);
  };
  const timeUpdateHandler = (e) => {
    const { currentTime, duration } = e.target;
    const animationPercentage =
      (Math.round(currentTime) / Math.round(duration)) * 100;
    setSongInfo({ currentTime, duration, animationPercentage });
    console.log(songInfo.animationPercentage);
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min="0"
            max={songInfo.duration}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div
            style={{
              transform: `translateX(${songInfo.animationPercentage}%)`,
            }}
            className="track__animated"
          ></div>
        </div>
        <p>{songInfo.duration ? formatTime(songInfo.duration) : "00:00"}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={songPlayHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
        />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndHandler}
        ></audio>
      </div>
    </div>
  );
};

export default Player;
