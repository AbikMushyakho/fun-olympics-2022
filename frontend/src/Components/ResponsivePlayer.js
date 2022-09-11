import React, { useState } from "react";
import ReactPlayer from "react-player";

const ResponsivePlayer = ({ url, onProgress }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          playing={playing}
          width="100%"
          height="100%"
          url={url}
          controls={true}
          onProgress={onProgress}
          onError={() => {
            alert("Failed to play video!!!");
          }}
          onPause={() => {
            setPlaying(false);
          }}
          onPlay={() => {
            setPlaying(true);
          }}
        />
      </div>
      <div className="flex flex-row justify-center m-2">
        <button
          className="text-white w-1/2 bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setPlaying(!playing)}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
};

export default ResponsivePlayer;
