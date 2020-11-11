import React from "react";
import Units from "./Units";

const UnitList = ({ filteredUnits }) => {
  return (
    <div>
      <Units filteredUnits={filteredUnits} level={1} />
      <Units filteredUnits={filteredUnits} level={2} />
      <Units filteredUnits={filteredUnits} level={3} />
      <Units filteredUnits={filteredUnits} level={4} />
      <Units filteredUnits={filteredUnits} level={5} />
      <Units filteredUnits={filteredUnits} level={6} />
      <Units filteredUnits={filteredUnits} level={7} />
      <Units filteredUnits={filteredUnits} level={8} />
      <Units filteredUnits={filteredUnits} level={9} />
      <Units filteredUnits={filteredUnits} level={10} />
      <Units filteredUnits={filteredUnits} level={11} />
      <Units filteredUnits={filteredUnits} level={12} />
      <Units filteredUnits={filteredUnits} level={13} />
      <Units filteredUnits={filteredUnits} level={14} />
    </div>
  );
};

export default UnitList;
