import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [count, setCount] = useState(0);

  return (
    <header className="fixed flex items-center justify-between w-full p-4 mt-5">
      <a href="/" id="logo">
        <img src="/logoSmall.svg" alt="Logo" />
      </a>

      <nav id="menu" className="flex items-center gap-10">
        <Link to="/news" className="p1 text-darkbrown">
          News
        </Link>
        <Link to="/activities" className="p1 text-darkbrown">
          Activities
        </Link>
        <Link to="/art" className="p1 text-darkbrown">
          Art
        </Link>
      </nav>
    </header>
  );
}

export default Header;
