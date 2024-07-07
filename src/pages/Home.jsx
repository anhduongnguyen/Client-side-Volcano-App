import React from "react";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

// Home page hero content
const Hero = () => (
  <section className="hero">
    <div className="hero_content">
      <h1 className="hero_title">Volcanoes of <br></br>The World</h1>
      <h2> click here to learn more: </h2>
      <Link to="/VolcanoList">
        <Button color="danger">Volcano List</Button>
      </Link>
    </div>
  </section>
);

// Display the home page
export default function Home() {
  return (
    <main>
      <Hero />
      <div className="home-page">
        <h2> Volcanoes are super cool! </h2>

        {/* information taken from spaceplace.nasa.gov */}
        <p>
          "A volcano is an opening on the surface of a planet or moon that allows
          material warmer than its surroundings to escape from its interior. When this material escapes,
          it causes an eruption. An eruption can be explosive, sending material high into the sky. Or
          it can be calmer, with gentle flows of material." - NASA
        </p>
      </div>
    </main>
  );
}
