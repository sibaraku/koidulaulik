import { useEffect, useState } from "react";
import Activity from "./Activity";

const { VITE_API_URL } = import.meta.env;

function ActivitiesPage() {
  const [activities, setActivities] = useState();
  const [loaded, setLoaded] = useState(0);
  const [error, setError] = useState(null);

  const handleLoadedActivity = () => {
    setLoaded((prev) => prev + 1);
  };

  const allLoaded = activities && activities.length * 2 === loaded;
  console.log(allLoaded);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}events`, {
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
        setActivities(data);
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

  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden">
      {!allLoaded && activities && (
        <div>
          Loaded {loaded} of {activities.length * 2}
        </div>
      )}
      <div
        className={`flex flex-col items-center bg-lightbrown w-dvw mb-10 m-30 rounded-lg max-w-430 ${!allLoaded && "hidden"}`}
      >
        <div className="bg-darkbrown p-8 text-center rounded-b-lg">
          <h1 className="h1 text-4xl font-bold text-lightbrown">Activities</h1>
          {/* <p className="text-lg mb-8">Explore our exciting activities!</p> */}
        </div>
        <div className="h-[60vh] overflow-y-auto">
          <div className="columns-3 gap-8 m-4">
            {activities &&
              activities.map((activ) => (
                <Activity
                  key={activ.id}
                  isPinned={true}
                  activity={activ}
                  onLoaded={handleLoadedActivity}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPage;
