import React from "react";

const Unit = ({ unit }) => {
  return (
    <div>
      <h2>{unit.title}</h2>
      <h4>Room {unit.room}</h4>
      <h4>Building {unit.building}</h4>
      <h4>Area {unit.area}</h4>
      <div>
        <img
          width="200"
          alt={`The unit titled: ${unit.title}`}
          src={unit.image_url}
        />
      </div>
      <p> Publication : {unit.start_date} </p>
    </div>
  );
};

export default Unit;
