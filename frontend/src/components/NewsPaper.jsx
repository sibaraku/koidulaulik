import { useState } from "react";
import Activity from "./Activity";
import { useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

function NewsPaper() {
  let params = useParams();
  let filePath = params["id"];

  const [isInterested, setIsInterested] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);

  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden max-w-5xl mx-auto gap-4">
      <div className="w-1/2 p-4 h-[50lvh] overflow-y-auto bg-newspaper rounded-lg border-2 border-black">
        <div className="p-4 rounded-lg border-2 border-darkbrown mb-4">
          <h2 className="logo-small">NewsPaper</h2>
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
            {additionalData ? (
              <h2 className="text-2xl font-semibold text-right text-black font-[kenia] font-regular">
                {additionalData}
              </h2>
            ) : (
              <h2 className="text-2xl font-semibold text-right text-black font-[kenia] font-regular">
                Sorry, I do not have any more information, but you can find out
                more about this event{" "}
                <a
                  href="https://www.startupday.ee"
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
    </div>
  );
}

export default NewsPaper;
