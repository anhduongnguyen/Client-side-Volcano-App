import React from "react";

// Dropdown for user to select the population radius of the volcano
export default function RadiusDropdown({ onRadiusChange }) {
  const handleRadiusChange = (event) => {
    onRadiusChange(event.target.value);
  };

  return (
    <div>
      <select onChange={handleRadiusChange}>
        <option value="">Select Radius</option>
        <option value="5km">5km</option>
        <option value="10km">10km</option>
        <option value="30km">30km</option>
        <option value="100km">100km</option>
      </select>
    </div>
  );
}
