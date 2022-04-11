import { Button } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useState, useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const top = document.getElementById("backtop");

    window.onscroll = function() {
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
              <a href="#"></a>
            </li>
            <li>
              <a href="#">Legal</a>
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
