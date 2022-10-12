import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ResponsivePlayer from "../../Components/ResponsivePlayer";
import VideoCard from "../../Components/VideoCard";
import { getAll, getOne } from "../../services/video";
import Moment from "react-moment";
import Loading from "../../Components/Loading";
import NotExists from "../../Components/NotExists";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { addToFav, getOne as getOneUser } from "../../services/users";
const VideoPlayer = ({ user, setMessage }) => {
  const [video, setVideo] = useState({});
  const [played, setPlayed] = useState(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [related, setRelated] = useState([]);
  const [fav, setFav] = useState(false);

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
        message: "Must login to watch videos!!",
        className: "warning",
      });
      navigate("/login");
    } else {
      const fetchVideo = async (id) => {
        try {
          const getUser = await getOneUser(loggedUser.id);
          if (getUser) {
            const userFav = getUser.favourites;
            const exists = userFav.some(
              (fav) => fav.id.toString() === id.toString()
            );
            if (exists) {
              setFav(true);
            }
          }
          const fetchedVideo = await getOne(id);
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
  }, [id]);

  // useEffect(() => {
  //   // title can be the fetched video title
  //   return () => {
  //     // save user's watch time

  //     // console.log(played);
  //     // console.log("Component unmount");
  //   };
  // }, [played]);

  const handleWatchTime = (state) => {
    // console.log(state);
    setPlayed(state.playedSeconds);
  };

  const handleFavourites = async () => {
    setFav(!fav);

    try {
      const response = await addToFav(id);
      if (response) {
        setMessage({
          message: response.message,
          className: "success",
        });
      }
    } catch (error) {
      setMessage({
        message: `${error.response.data.error}`,
        className: "warning",
      });
    }
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

              <div className="p-2 flex flex-row justify-between">
                <div>
                  {video.views} views *{" "}
                  <Moment fromNow>{video.addedDate}</Moment>
                </div>
                <div
                  className="flex flex-row justify-end space-x-3 item-center cursor-pointer "
                  onClick={handleFavourites}
                >
                  <div className="w-auto h-full">
                    {fav ? (
                      <BsFillStarFill className="w-6 h-6" />
                    ) : (
                      <AiOutlineStar className="w-7 h-7" />
                    )}
                  </div>{" "}
                  <div>
                    {fav ? (
                      <span className="p-2">Added to favourites</span>
                    ) : (
                      <span className="p-2">Add to favourites</span>
                    )}
                  </div>
                </div>
              </div>

              <hr />

              <div className="p-5 flex flex-col">
                <span> Uploaded by {video.uploader.username}</span>
                <span className="text-wheatt text-lg mt-5">Description</span>
                <span> {video.description}</span>
              </div>
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
                    linkUrl: `/categories/${video.category.id}/${video.id}`,
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
