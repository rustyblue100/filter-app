import { useEffect } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Box, Button } from "@material-ui/core";

const Footer = () => {
  useEffect(() => {
    const top = document.getElementById("backtop");

    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 1000 ||
        document.documentElement.scrollTop > 1000
      ) {
        top.style.display = "block";
      } else {
        top.style.display = "none";
      }
    }
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <nav>
        <div className="row">
          <ul>
            <li>
              <a href="#">THE VILLAGE - 125 AND 133 BRONTE RD, OAKVILLE</a>
            </li>
            <li>
              <a href="http://crombiereit.com/disclaimer">Legal</a>
            </li>
          </ul>
        </div>
      </nav>

      <Button
        id="backtop"
        arial-label="scroll-top"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => scrollTop()}
      >
        <ArrowUpwardIcon fontSize="large" />
      </Button>
    </footer>
  );
};

export default Footer;
