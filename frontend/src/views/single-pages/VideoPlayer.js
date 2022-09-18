import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ResponsivePlayer from "../../Components/ResponsivePlayer";
import VideoCard from "../../Components/VideoCard";
import { getAll, getOne } from "../../services/video";
import Moment from "react-moment";
import Loading from "../../Components/Loading";
import NotExists from "../../Components/NotExists";
const VideoPlayer = ({ user, setMessage }) => {
  const [video, setVideo] = useState({});
  const [played, setPlayed] = useState(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  console.log(id);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    let loggedUser = null;
    if (user !== null) {
      loggedUser = user;
    } else {
      const localUser = window.localStorage.getItem("loggedInOlympicsUser");
      loggedUser = JSON.parse(localUser);
    }

    if (loggedUser === null) {
      setMessage({
        message: "Must login to watch live videos!!",
        className: "warning",
      });
      navigate("/login");
    } else {
      const fetchVideo = async (id) => {
        try {
          const fetchedVideo = await getOne(id);
          console.log(fetchedVideo);
          const allVideo = await getAll();
          setVideo(fetchedVideo);
          const filtered = allVideo.filter((v) => v.id !== id);
          setRelated(filtered);
          setIsLoading(false);
        } catch (error) {
          setMessage({
            message: `${error.response.data.error}`,
            className: "warning",
          });
        }
      };
      fetchVideo(id);
    }
  }, []);

  useEffect(() => {
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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ResponsivePlayer
              url={video.video_url}
              onProgress={handleWatchTime}
            />
            <div className="text-gray-700 dark:text-gray-400 py-2 md:my-2 flex flex-col space-y-1">
              <span className="text-wheatt text-sm md:text-3xl font-bold">
                {video.title}
              </span>

              <span>
                {video.views} views * <Moment fromNow>{video.addedDate}</Moment>{" "}
              </span>

              <hr />

              <p>
                {video.uploader.username}
                {video.description}
              </p>
              <span>Played:{played} </span>
            </div>
          </>
        )}

        <div className="my-6">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            Related Videos
          </span>
          <hr className=" mt-4 h-1" />
        </div>

        {related.length > 0 ? (
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
            {related.map((video, index) => {
              return (
                <VideoCard
                  key={index}
                  details={{
                    title: video.title,
                    linkUrl: `/categories/${video.category}/${video.id}`,
                    videoUrl: video.video_url,
                    views: video.views,
                    addedDate: video.addedDate,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <NotExists name="related videos" />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
