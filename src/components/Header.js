import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
const Header = () => {
  const [mobileIsOpen, setMobileIsOpen] = useState(false);

  function handleOnclick() {
    setMobileIsOpen(!mobileIsOpen);
  }

  useEffect(() => {
    //Hide menu on scroll
    window.addEventListener("scroll", menuWix);

    function menuWix() {
      if (
        document.body.scrollTop > 600 ||
        document.documentElement.scrollTop > 600
      ) {
        document.getElementById("header").style.top = "-100px";
      } else {
        document.getElementById("header").style.top = "0px";
      }
    }

    const close = (e) => {
      if (e.keyCode === 27) {
        setMobileIsOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div style={{ marginBottom: "100px" }}>
      <header id="header">
        <nav>
          <div className="row">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="https://www.thevillageatbronte.com/lifestyle">
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="https://www.thevillageatbronte.com/amenities">
                  Amenities
                </a>
              </li>
              <li>
                <a href="https://www.thevillageatbronte.com/gallery">Gallery</a>
              </li>
              <li>
                <a className="active" href="#">
                  Plans
                </a>
              </li>
              <li>
                <a href="https://www.thevillageatbronte.com/team">Team</a>
              </li>
              <li>
                <a href="https://www.thevillageatbronte.com/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div
          className={`burger-menu ${mobileIsOpen ? "active" : ""}`}
          onClick={() => handleOnclick()}
        >
          {!mobileIsOpen && (
            <svg height="20" viewBox="0 0 100 80" width="20">
              <rect height="10" width="60%"></rect>
              <rect height="10" width="60%" y="30"></rect>
              <rect height="10" width="60%" y="60"></rect>
            </svg>
          )}

          {mobileIsOpen && <div className="burger-menu__close">&times;</div>}
        </div>

        {mobileIsOpen === true && <MobileMenu tabIndex="0" />}
      </header>
    </div>
  );
};

export default Header;
