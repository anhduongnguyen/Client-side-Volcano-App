import React, { useState, useEffect } from "react";
import CountryDropdown from "../components/CountryDropdown";
import Table from "../components/Table";
import RadiusDropdown from "../components/RadiusDropdown";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Page to show the list of volcanoes in a table including the rendering
of the country dropdown, and radius dropdown if user is logged in */
export default function VolcanoList() {
  const [rowData, setRowData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRadius, setSelectedRadius] = useState("");

  const columns = [
    {
      headerName: "Name", field: "name", flex: 1,
      sortable: true, filter: "agTextColumnFilter"
    },

    {
      headerName: "Region", field: "region", flex: 1,
      sortable: true, filter: "agTextColumnFilter"
    },

    {
      headerName: "Subregion", field: "subregion", flex: 1,
      sortable: true, filter: "agTextColumnFilter"
    }
  ];

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleRadiusChange = (radius) => {
    setSelectedRadius(radius);
  };

  /* Fetch the volcanoes in the selected country and whether 
  it is populated within Xkm of a volcano */
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCountry !== "") {
          const response = await fetch(`http://4.237.58.241:3000/volcanoes?country=${selectedCountry}&populatedWithin=${selectedRadius}`);
          const data = await response.json();
          setRowData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("an error has occured, unable to show volcanoes");
      }
    };

    fetchData();
  }, [selectedCountry, selectedRadius]);

  // Handle the country and radius dropdown selections
  return (
    <div className="list-container">
      <h1>Volcano List</h1>
      <div className="dropdowns">
        <div className="dropdown">
          <label htmlFor="radiusDropdown"> Country:</label>
          <CountryDropdown onCountryChange={handleCountryChange} />
        </div>
        <div className="dropdown">
          <label htmlFor="radiusDropdown">Populated Within:</label>
          <RadiusDropdown onRadiusChange={handleRadiusChange} id="radiusDropdown" />
        </div>
      </div>
      <Table rowData={rowData} columns={columns} />
      <ToastContainer />
    </div>
  );
}
