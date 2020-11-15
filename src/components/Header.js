import { useEffect } from "react";

const Header = () => {
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

    //mobile menu
    const burger = document.querySelector(".burger-menu");
    const burgerLine = document.querySelector(".burger-menu svg");
    const burgerClose = document.querySelector(".burger-menu__close");
    const mobileMenu = document.querySelector(".mobile-menu");

    burger.addEventListener("click", () => {
      if (mobileMenu.style.display !== "block") {
        mobileMenu.style.display = "block";
        mobileMenu.style.opacity = 1;
        burgerLine.style.display = "none";
        burgerClose.style.display = "block";
        burger.classList.add("active");
      } else {
        mobileMenu.style.display = "none";
        burgerLine.style.display = "block";
        burgerClose.style.display = "none";
        burger.classList.remove("active");
      }
    });
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
                <a href="https://brontevillageapartments.com/lifestyle">
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="https://brontevillageapartments.com/amenities">
                  Amenities
                </a>
              </li>
              <li>
                <a href="https://brontevillageapartments.com/gallery">
                  Gallery
                </a>
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
                <a href="https://brontevillageapartments.com/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="burger-menu">
          <svg height="20" viewBox="0 0 100 80" width="20">
            <rect height="10" width="60%"></rect>
            <rect height="10" width="60%" y="30"></rect>
            <rect height="10" width="60%" y="60"></rect>
          </svg>
          <div className="burger-menu__close">&times;</div>
        </div>
        <nav className="mobile-menu">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="https://brontevillageapartments.com/lifestyle">
                Lifestyle
              </a>
            </li>
            <li>
              <a href="https://brontevillageapartments.com/amenities">
                Amenities
              </a>
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
              <a href="https://brontevillageapartments.com/register">
                Register
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
