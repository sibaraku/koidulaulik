import { useEffect, useState } from "react";
import Activity from "./Activity";
import { useLocation, useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

const { VITE_API_URL } = import.meta.env;

function DetailedActivity() {
  let params = useParams();
  let filePath = params["id"];
  const [error, setError] = useState();
  const [activity, setActivity] = useState();

  const location = useLocation();

  const isImage = location.state.image;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}events/${filePath}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          const errorMessage = await response.text();
          setError({
            title: "Problems with backend",
            message: errorMessage || "Invalid email or password.",
          });
          return;
        }

        console.log(data);
        setActivity(data);
      } catch (error) {
        console.log(error);
        setError({
          title: "Server Unreachable",
          message: "Failed to add user, please try again later.",
        });
        return;
      }
    };
    fetchData();
  }, []);

  const [isInterested, setIsInterested] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);

  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden max-w-5xl mx-auto gap-4">
      {isImage ? (
        <img
          src={"https://kultuuriaken.tartu.ee/" + activity?.img_url}
          alt=""
          className="w-100"
        />
      ) : (
        <Activity isPinned={false} activity={activity} />
      )}
      <div className="w-1/2 p-4 h-[50lvh] overflow-y-auto">
        <div className="p-4 rounded-lg border-2 border-darkbrown mb-4">
          <h2 className="logo-small mb-4 text-right text-blue">Koidulaulik</h2>
          <h2 className="text-2xl font-semibold text-right text-black font-[kenia] font-regular">
            Are you interested in this event?
          </h2>
        </div>
        <div className="p-4 rounded-lg border-2 border-darkbrown mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-left text-blue font-[kenia] font-regular">
            You
          </h2>
          <button
            onClick={() => setIsInterested(true)}
            className="group relative flex items-center text-2xl font-semibold text-left text-black font-[kenia] mb-2 pl-6"
          >
            <span
              className="absolute left-0 opacity-0 -translate-x-2 transition-all duration-200
               group-hover:opacity-100 group-hover:translate-x-0
               group-focus:opacity-100 group-focus:translate-x-0"
            >
              <IoMdArrowDropright className="text-2xl" />
            </span>
            <span
              className="transition-all duration-200
               group-hover:translate-x-2
               group-focus:translate-x-2"
            >
              Yes, give me additional information about this event!
            </span>
          </button>

          <button
            onClick={() => setIsInterested(false)}
            className="group relative flex items-center text-2xl font-semibold text-left text-black font-[kenia] mb-2 pl-6"
          >
            <span
              className="absolute left-0 opacity-0 -translate-x-2 transition-all duration-200
               group-hover:opacity-100 group-hover:translate-x-0
               group-focus:opacity-100 group-focus:translate-x-0"
            >
              <IoMdArrowDropright className="text-2xl" />
            </span>
            <span
              className="transition-all duration-200
               group-hover:translate-x-2
               group-focus:translate-x-2"
            >
              No, I am gonna find something better for myself!
            </span>
          </button>
        </div>
        {isInterested && (
          <div className="p-4 rounded-lg border-2 border-darkbrown mt-4">
            <h2 className="text-2xl font-semibold mb-2 text-right text-blue font-[kenia] font-regular">
              Koidulaulik
            </h2>
            {isImage ? (
              <div className="text-right text-black font-[kenia] font-regular space-y-2 text-2xl leading-relaxed">
                <p className="font-semibold text-2xl">{activity.name}</p>

                <p className="text-xl">{activity.description}</p>

                <p className="text-xl">
                  {activity.event_date_start === activity.event_date_end
                    ? activity.event_date_start
                    : `${activity.event_date_start} – ${activity.event_date_end}`}
                </p>

                <p className="text-xl">
                  {activity.event_time_start.slice(0, 5)} –{" "}
                  {activity.event_time_end.slice(0, 5)}
                </p>

                <p className="text-xl">Tartu, Estonia</p>

                <p className="text-xl">{activity.price}</p>

                <p className="text-xl">
                  You can find more information{" "}
                  <a
                    href={activity.url}
                    className="text-blue underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                  .
                </p>
              </div>
            ) : (
              <h2 className="text-2xl font-semibold text-right text-black font-[kenia] font-regular">
                Sorry, I do not have any more information, but you can find out
                more about this event{" "}
                <a
                  href={activity.url}
                  className={"text-blue"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </h2>
            )}
          </div>
        )}
      </div>
      <div className="w-80">
        <img
          src="/koidulaulik.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default DetailedActivity;
