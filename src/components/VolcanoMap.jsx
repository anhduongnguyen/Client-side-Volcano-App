import React, { useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

// Display the volcano's location on the map
export default function VolcanoMap({ latitude, longitude }) {
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 100% 60%)`;
  const [center] = useState([parseFloat(latitude), parseFloat(longitude)]);

  // Code from pigeonmaps.com
  return (
    <Map defaultCenter={center} defaultZoom={4}>
      <Marker
        width={50}
        anchor={center}
        color={color}
        onClick={() => setHue(hue + 20)}
      />
      <ZoomControl />
    </Map>
  );
}
