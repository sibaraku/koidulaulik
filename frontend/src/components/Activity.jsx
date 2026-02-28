import { useState } from "react";

function Activity(props) {
  return (
    <div className={`shadow-md p-6 bg-activity w-80 relative`}>
      {props.isPinned && (
        <div className="w-15 h-15 absolute -top-3 left-30">
          <img className="w-full h-full" src="/pin.svg" alt="" />
        </div>
      )}
      <h2
        className={`${props.isPinned ? "mt-7" : ""} text-2xl font-semibold mb-2 text-center text-black font-[condiment] font-regular`}
      >
        Startup Day
      </h2>
      <img
        src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
        alt=""
      />
      <br />

      <p className="text-black text-wrap break-words font-[condiment]">
        The most startup-minded business festival is back! Join us on 27-29
        January in Tartu.
      </p>
      <br />
      <p className="text-black text-wrap break-words font-[condiment]">
        Fee: 20€ (includes access to all sessions, workshops, and networking
        events)
      </p>
    </div>
  );
}

export default Activity;
