import { useState } from "react";
import Activity from "./Activity";

function ActivitiesPage() {
  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden">
      <div className="flex flex-col items-center bg-lightbrown w-dvw mb-10 m-30 rounded-lg max-w-430">
        <div className="bg-darkbrown p-8 text-center rounded-b-lg">
          <h1 className="h1 text-4xl font-bold text-lightbrown">Activities</h1>
          {/* <p className="text-lg mb-8">Explore our exciting activities!</p> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 overflow-y-auto h-[60lvh]">
          <Activity isPinned={true} />
          <Activity isPinned={true} />
          <Activity isPinned={true} />
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPage;
