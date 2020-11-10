import React, { useState } from "react";

const Filter = ({
  filterByRooms,
  setFilterByRooms,
  filterByBuilding,
  setFilterByBuilding,
  filterBySqFt,
  setFilterBySqFt,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const clearFilter = (e) => {
    setFilterByRooms("");
    setFilterByBuilding("");
    setFilterBySqFt("");
  };
  const handleFilterByRooms = (e) => {
    setFilterByRooms(e.target.value);
  };

  const handleFilterByBuilding = (e) => {
    setFilterByBuilding(e.target.value);
  };

  const handleFilterBySqFt = (e) => {
    setFilterBySqFt(e.target.value);
  };

  return (
    <div>
      <form className="search">
        <label>Rooms : </label>

        <input
          class="filter-item check"
          id="1"
          name="Checkbox"
          type="checkbox"
          value="1"
          defaultChecked={filterByRooms}
          onChange={handleFilterByRooms}
        />
        <label for="1">
          <span>1</span>
        </label>

        <input
          class="filter-item check"
          id="2"
          name="CSS Only"
          type="checkbox"
          value="2"
          defaultChecked={filterByRooms}
          onChange={handleFilterByRooms}
        />
        <label for="2">
          <span>2</span>
        </label>
        <br />

        <label>Building : </label>
        <input
          class="filter-item check"
          id="A"
          name="Checkbox"
          type="checkbox"
          value="A"
          defaultChecked={filterByBuilding}
          onChange={handleFilterByBuilding}
        />
        <label for="A">
          <span>A</span>
        </label>

        <input
          class="filter-item check"
          id="B"
          name="CSS Only"
          type="checkbox"
          value="B"
          defaultChecked={filterByBuilding}
          onChange={handleFilterByBuilding}
        />
        <label for="B">
          <span>B</span>
        </label>
        <br />

        <label>StFt : </label>
        <input
          class="filter-item check"
          id="400-799"
          name="CSS Only"
          type="checkbox"
          value="400-799"
          defaultChecked={filterBySqFt}
          onChange={handleFilterBySqFt}
        />
        <label for="400-799">
          <span>400-800</span>
        </label>

        <input
          class="filter-item check"
          id="800-999"
          name="CSS Only"
          type="checkbox"
          value="800-999"
          defaultChecked={filterBySqFt}
          onChange={handleFilterBySqFt}
        />
        <label for="800-999">
          <span>800-1000</span>
        </label>

        <input
          class="filter-item check"
          id="1000"
          name="CSS Only"
          type="checkbox"
          value="1000"
          defaultChecked={filterBySqFt}
          onChange={handleFilterBySqFt}
        />
        <label for="1000">
          <span>1000+</span>
        </label>
        {/* 
        <input
          class="filter-item check"
          id="check_1"
          name="Checkbox"
          type="checkbox"
          value="2020"
          defaultValue={""}
          onChange={handleFilterBySqFt}
        />
        <label for="check_1">
          <span>2020</span>
        </label>

        <input
          class="filter-item check"
          id="css_only"
          name="CSS Only"
          type="checkbox"
          value="2021"
          defaultValue={""}
          onChange={handleFilterBySqFt}
        />
        <label for="css_only">
          <span>2121</span>
        </label> */}

        {/*         <label>Type : </label>
        <select defaultValue={filterByRooms} onChange={handleFilterByRooms}>
          <option value="TV">Série</option>
          <option value="Movie">Film</option>
          <option value="OVA">OVA</option>
        </select>
        <label> year : </label>
        <select defaultValue={filterByYear} onChange={handleFilterBySqFt}>
          <option value="2020">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </select> */}
      </form>
      <button onClick={clearFilter}>clear</button>
    </div>
  );
};

export default Filter;
