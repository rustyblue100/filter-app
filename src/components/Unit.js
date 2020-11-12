import React, { useEffect } from "react";

import LazyLoad from "react-lazyload";
import { Link, useParams, useLocation } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";

const Unit = ({ data }) => {
  const location = useLocation();
  console.log(location.pathname.split("/")[1] === "unit");

  const { unitNumber } = useParams();

  const unitData = data.filter(
    (unit) => unit.fields && unit.fields.unit === unitNumber
  );

  useEffect(() => {
    if (location.pathname.split("/")[1] === "unit") {
      document.querySelector(".App").style.display = "none";
    } else {
      document.querySelector(".App").style.display = "block";
    }
  }, [location]);

  const { unit, area, planpng } = unitData[0] ? unitData[0].fields : "";

  return (
    <div>
      <Link to={`/`}>
        <Button>back</Button>
      </Link>
      <h1>{unit}</h1>
      Square Ft: {area}
      <LazyLoad height={400} once>
        <img
          src={planpng && planpng[0].thumbnails.full.url}
          alt={unit}
          width="500"
        />
      </LazyLoad>
    </div>
  );
};

export default Unit;
