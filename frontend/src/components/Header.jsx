import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [count, setCount] = useState(0);

  return (
    <header id="header">
      <a href="/" id="logo">
        <img src="./logo.svg" alt="Logo" className="w-50 h-50" />
      </a>

      <nav id="menu">
        <Link to="/news" className="menuItem">
          News
        </Link>
        <Link to="/activites" className="menuItem">
          Activites
        </Link>
        <Link to="/art" className="menuItem">
          Art
        </Link>
      </nav>
    </header>
  );
}

export default Header;
