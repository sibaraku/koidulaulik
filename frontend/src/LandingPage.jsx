import { useState } from "react";

function LandingPage() {
  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden">
      <div className="flex flex-col items-center">
        <img src="./logo.svg" alt="logo" />
        <div className="relative w-100 h-30 mt-10 cursor-pointer hover:scale-105 transition-transform duration-300">
          <img
            src="./enterButton2.svg"
            alt="enter button 2"
            className="absolute"
          />
          <img
            src="./enterButton.svg"
            alt="enter button"
            className="absolute top-1.5"
          />
          <p className="button absolute top-7 left-1/2 transform -translate-x-1/2">
            Enter
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
