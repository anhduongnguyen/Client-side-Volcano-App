import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dropdown for user to select the country and handle user's selection
export default function CountryDropdown({ onCountryChange }) {
  const [countries, setCountries] = useState([]);

  // Fetch the list of countries from the API and display it in the dropdown
  useEffect(() => {
    var isMounted = true;

    const fetchCountries = async () => {
      try {
        const response = await fetch(`http://4.237.58.241:3000/countries`);
        const data = await response.json();

        if (isMounted) {
          setCountries(data.map(country => ({ value: country, label: country })));

        }

      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("an error has occured, countries unavailable");
      }
    };

    fetchCountries();

    return () => {
      isMounted = false;
    };

  }, []);

  // Some bits of code has been taken from react-select.com
  const filterOptions = (inputValue) => {
    return countries.filter(country =>
      country.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = async (inputValue, callback) => {
    callback(filterOptions(inputValue));
  };

  // Handle the country selection
  return (
    <>
      <div style={{ width: '400px' }}>
        <AsyncSelect
          cacheOptions
          defaultOptions={countries}
          loadOptions={loadOptions}
          onChange={(selectedOption) => onCountryChange(selectedOption ? selectedOption.value : '')}
          placeholder="Select a country"
        />
      </div>
      <ToastContainer />
    </>
  );
}
