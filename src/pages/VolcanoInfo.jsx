import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VolcanoMap from "../components/VolcanoMap";
import PopulationChart from "../components/PopulationChart";
import { Button } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import signOut from "../helpers/SignOut";

/* Page to show information of the volcano including the rendering
of the map, and population chart if user is logged in */
export default function VolcanoInfo() {
  const { id } = useParams();
  const [volcano, setVolcano] = useState(null);
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const tokenDuration = parseInt(window.localStorage.getItem("tokenDuration"), 10);

  useEffect(() => {
    var isMounted = true;
    var headers = {};

    // Calculate if the token has exceeded its duration time
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const loginTime = parseInt(window.localStorage.getItem("loginTime"));
    const expirationTime = loginTime + tokenDuration;

    // If user the token has expired, log the user out, otherwise fetch the data
    const fetchData = async () => {
      try {
        if (isLoggedIn && loginTime) {
          if (currentTime > expirationTime) {
            toast.error("session has expired, please log in again");
            signOut();
            return;
          }
          const token = window.localStorage.getItem("token");
          headers = {
            Authorization: `Bearer ${token}`
          };
        }

        const response = await fetch(`http://4.237.58.241:3000/volcano/${id}`, {
          headers
        });

        if (response.status === 401) {
          toast.error("Unauthorized. Please log in again");
          signOut();
          return;
        }
        
        const data = await response.json();

        if (isMounted) {
          setVolcano(data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("an error has occurred, unable to show volcano information");
        setTimeout(() => {
          window.location.href = '/volcanolist';
        }, 2000);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id, isLoggedIn, tokenDuration]);

  // Display the individual volcano page based on whether the user is logged in or not
  return (
    <div>
      <div className="volcano-button">
        <Link to="/VolcanoList">
          <Button color="danger">Back</Button>
        </Link>
      </div>
      <div className="map-container">
        {volcano && <VolcanoMap latitude={volcano.latitude} longitude={volcano.longitude} />}
      </div>
      <div className="individual-volcano">
        {volcano && (
          <div>
            <h2>{volcano.name}</h2>
            <p>Country: {volcano.country}</p>
            <p>Region: {volcano.region}</p>
            <p>Subregion: {volcano.subregion}</p>
            <p>Last Eruption: {volcano.last_eruption}</p>
            <p>Summit Height: {volcano.summit} m</p>
            <p>Elevation: {volcano.elevation} ft</p>
          </div>
        )}
      </div>
      {isLoggedIn ?
        <div className="chart">
          <PopulationChart populationData={volcano} />
        </div> : null}
      <ToastContainer />
    </div>
  );
}
