export const playAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    (async () => {
      await audioRef.current.play();
      audioRef.current.play();
    })();
  }
};

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
};
