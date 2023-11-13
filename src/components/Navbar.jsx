import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { logo, arrowDown } from "../assets/images";
const Navbar = () => {
  const [font, setFont] = useState("Serif");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    let body = document.getElementsByTagName("BODY")[0];
    let fontInput = document.getElementById("fontInput");
    fontInput.style.fontFamily = `var(--${font.toLowerCase()})`;
    body.style.fontFamily = `var(--${font.toLowerCase()})`;
  }, [font]);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
    <div className="navbar">
      <img src={logo} alt="" />
      <div className="navright">
        <div className={`fonts ${font.toLowerCase()}`} onClick={toggleDropdown}>
          {font}
          <img src={arrowDown} alt="" />
          {isDropdownOpen && (
            <ul>
              <li className="serif" onClick={() => setFont("Serif")}>
                Serif
              </li>
              <li className="sans-serif" onClick={() => setFont("Sans-serif")}>
                Sans-serif
              </li>
              <li className="monospace" onClick={() => setFont("Monospace")}>
                Monospace
              </li>
            </ul>
          )}
        </div>
        <div className="line"></div>
        <div className="toggle">
          <label className="switch">
            <input type="checkbox" onChange={toggleTheme} />
            <span className="slider round"></span>
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
