import React from "react";

const MobileMenu = () => {
  return (
    <nav className="mobile-menu">
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Lifestyle</a>
        </li>
        <li>
          <a href="#">Amenities</a>
        </li>
        <li>
          <a href="#">Gallery</a>
        </li>
        <li>
          <a className="active" href="#">
            Plans
          </a>
        </li>
        <li>
          <a href="#">Team</a>
        </li>
        <li>
          <a href="#">Register</a>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
