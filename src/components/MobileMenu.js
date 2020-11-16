import React from "react";

const MobileMenu = () => {
  return (
    <nav className="mobile-menu">
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="https://brontevillageapartments.com/lifestyle">Lifestyle</a>
        </li>
        <li>
          <a href="https://brontevillageapartments.com/amenities">Amenities</a>
        </li>
        <li>
          <a href="https://brontevillageapartments.com/gallery">Gallery</a>
        </li>
        <li>
          <a className="active" href="#">
            Plans
          </a>
        </li>
        <li>
          <a href="https://brontevillageapartments.com/team">Team</a>
        </li>
        <li>
          <a href="https://brontevillageapartments.com/register">Register</a>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
