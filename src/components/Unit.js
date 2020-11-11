import React from "react";
import LazyLoad from "react-lazyload";
import { Link, useParams } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";

const Unit = ({ data }) => {
  console.log(data);

  const { unitNumber } = useParams();

  const unitData = data.filter(
    (unit) => unit.fields && unit.fields.unit === unitNumber
  );

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
