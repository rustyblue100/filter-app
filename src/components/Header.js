import React from "react";
import "./header.css";

import { makeStyles } from "@material-ui/core/styles";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Input,
  Button,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: "#000000",
  },
}));
const Header = () => {
  const classes = useStyles();
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
          <svg height="20" viewbox="0 0 100 80" width="20">
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
