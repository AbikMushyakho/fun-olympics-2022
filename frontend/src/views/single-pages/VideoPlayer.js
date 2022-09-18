import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ResponsivePlayer from "../../Components/ResponsivePlayer";
import VideoCard from "../../Components/VideoCard";

const VideoPlayer = ({ user ,setMessage}) => {
  const navigate = useNavigate();
 

  const [played, setPlayed] = useState(0);

  useEffect(() => {
    if (user === null) {
      setMessage({message:'Must login to watch live videos!!', className:'warning'})
      navigate("/login");
    }
    // title can be the fetched video title
    document.title = "Video player";
    return () => {
      // save user's watch time

      console.log(played);
      console.log("Component unmount");
    };
  }, [played]);

  const handleWatchTime = (state) => {
    console.log(state);
    setPlayed(state.playedSeconds);
  };

  return (
    <div>
      <div className="w-full flex flex-col">
        <ResponsivePlayer
          url={user ? "/assets/live-video/swimming.mp4" : ""}
          onProgress={handleWatchTime}
        />
        <div className="text-wheatt font-bold py-2 md:my-2">
          <span className="text-sm md:text-3xl">
            Michael Phelps Last Olympic Race - Swimming Men's 4x100m Medley
            Relay Final | Rio
          </span>
          <br />
          <span>Played:{played} </span>
        </div>

        <div className="my-6">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            Related Videos
          </span>
          <hr className=" mt-4 h-1" />
        </div>

        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
          <VideoCard
            details={{
              title:
                "Michael Phelps Last Olympic Race - Swimming Men's 4x100m Medley Relay Final | Rio",
              thumbnailUrl: "/assets/thumbnails/swimming.jpg",
              linkUrl: "/categories/1/1",
              videoUrl: "/assets/live-video/swimming.mp4",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
