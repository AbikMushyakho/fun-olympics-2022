import React, { useEffect, useState } from "react";
import VideoCard from "../Components/VideoCard";
import { useNavigate } from "react-router-dom";
import { getAll } from "../services/video";
import Loading from "../Components/Loading";
import NotExists from "../Components/NotExists";
const Live = ({ user, setMessage }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    let loggedUser = null;
    if (user !== null) {
      loggedUser = user;
    } else {
      const localUser = window.localStorage.getItem("loggedInOlympicsUser");
      loggedUser = JSON.parse(localUser);
    }

    if (loggedUser === null) {
      navigate("/login");
      setMessage({
        message: "Must login to watch live videos!!",
        className: "warning",
      });
    } else {
      const fetch = async () => {
        try {
          const fetchedData = await getAll();
          setRecents(fetchedData);
          setIsLoading(false);
        } catch (error) {
          setMessage({
            message: `${error.response.data.error}`,
            className: "error",
          });
        }
      };

      fetch();
    }
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div className="mb-8 w-full flex justify-center">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Live
        </span>
      </div>

      {/* <ToastContainer position="top-right" /> */}
      <div className="flex justify-end h-auto live-video lg:justify-center">
        <div className="flex flex-row absolute mt-2 justify-end text-wheatt w-80 md:w-96 lg:w-full">
          <span className="bg-red-600 font-bold p-1 lg:p-1.5 mr-4 rounded-lg  lg:mr-60">
            Live
          </span>
        </div>
        {/* <ReactPlayer url="/assets/live-video/swimming.mp4" controls={true} autoPlay muted={true} /> */}
        <video autoPlay controls muted loop>
          <source src="/assets/live-video/swimming.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="text-wheatt font-bold py-2 md:px-10 md:mx-10 md:my-2">
        <span className="text-sm md:text-3xl">
          Michael Phelps Last Olympic Race - Swimming Men's 4x100m Medley Relay
          Final | Rio
        </span>
      </div>

      <div className="my-6">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Recent uploads
        </span>
        <hr className=" mt-4 h-1" />
      </div>

      {isLoading ? (
        <Loading />
      ) : recents.length > 0 ? (
        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
          {recents.map((video, index) => {
            return (
              <VideoCard
                key={video.id}
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
        <NotExists name="recent uploads" />
      )}
    </div>
  );
};

export default Live;
