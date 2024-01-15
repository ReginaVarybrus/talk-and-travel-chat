import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer } from 'react-leaflet/MapContainer';
import { GeoJSON } from 'react-leaflet';
import mapData from '../../data/countries.json';
import 'leaflet/dist/leaflet.css';
import '../../css/ChatMap.css';

import { sendDataCountryToBackend } from '../../redux-store/AuthOperations/DataCountryOperation.js';
import { getUserId } from 'redux-store/AuthOperations/selectors';
import { CountryName } from './ChatMapStyled';
// import { TileLayer } from 'react-leaflet/TileLayer';
// import { useMap } from 'react-leaflet/hooks';
// import { TileLayer, useMap } from 'react-leaflet';

export default function ChatMap() {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const onCountryHover = e => {
    const countryName = e;
    setSelectedCountry(countryName);
  };


  console.log(mapData);

  let color = [
    '#e9f0fb',
    '#cbdbf4',
    '#a1bfec',
    '#76a1e3',
    '#4c85da',
    '#256ad2',
    '#1f5ab3',
    '#1a4b95',
    '#153c78',
    '#11305e',
  ];

  const countryStyle = {
    fillOpacity: 1,
    color: '#140951',
    weight: 1,
  };

  const onEachCountry = (country, layer) => {
    // const countryName = country.properties.ADMIN;
    // layer.bindPopup(countryName);

    // layer.options.fillOpacity = Math.random();
    const colorIndex = Math.floor(Math.random() * color.length);
    layer.options.fillColor = color[colorIndex];

    layer.on({
      click: e => {
        const data = {
          name: e.target.feature.properties.ADMIN,
          flagCode: e.target.feature.properties.code,
        };
        dispatch(sendDataCountryToBackend(userId, data));
        console.log('data to send', userId, data);
      },
      mouseover: e => {
        const countryName = e.target.feature.properties.ADMIN;
        onCountryHover(countryName);
        e.target.setStyle({
          color: '#ffffff',
        });
        // layer.bindPopup(e.target.feature.properties.ADMIN).openPopup();
      },
      mouseout: e => {
        e.target.setStyle({
          color: '#140951',
        });
      },
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        style={{ width: '1150px', height: '750px' }}
        zoom={2.3}
        center={[40, 0]}
      >
        <GeoJSON
          style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
        <CountryName>{selectedCountry}</CountryName>
      </MapContainer>
    </div>
  );
}
