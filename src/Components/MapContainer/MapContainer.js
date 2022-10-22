import React, {useState, useEffect} from 'react'
import "./MapContainer.css"
import Map, {Source, Layer} from 'react-map-gl';

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#000000'
  }
};

function MapContainer({restaurants}) {
  let aveLon = restaurants.reduce((res, restaurant) => {
    res += (restaurant.lon / restaurants.length)
    return res
  }, 0)
  let aveLat = restaurants.reduce((res, restaurant) => {
    res += (restaurant.lat / restaurants.length)
    return res
  }, 0)
  const [geojson, setGeojson] = useState({});
  const [viewport, setViewport] = useState({
    longitude: aveLon,
    latitude: aveLat,
    zoom: 11
  });

  useEffect(() => {
    let pinArray = []
    restaurants.map(restaurant => {
      let pinObject = {type: 'Feature', geometry: {type: 'Point', coordinates: [restaurant.lon, restaurant.lat]}}
      return pinArray.push(pinObject)     
    });

    let objectCopy = {
      type: 'FeatureCollection',
      features:[
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
      ] 
    }
    objectCopy.features = pinArray
    setGeojson({...objectCopy})
  },[restaurants])


  return (
    <Map 
    initialViewState={viewport} 
    mapboxAccessToken={'pk.eyJ1IjoiZGF2aWRkYXciLCJhIjoiY2w5ajdtd3RhMHlrcTNubXc3N3J6dWNwdiJ9.Cslh_p8Ow8KRA6Zy3XDhbg'}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}
export default MapContainer