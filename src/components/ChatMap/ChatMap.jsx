import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import { MapContainer } from 'react-leaflet/MapContainer';
import { GeoJSON } from 'react-leaflet';
import mapData from '../../data/countries.json';
import 'leaflet/dist/leaflet.css';
import '../../css/ChatMap.css';

import { sendDataCountryToBackend } from '../../redux-store/AuthOperations/AuthOperations.js';
import {
  getUserId,
  getPersistedToken,
} from 'redux-store/AuthOperations/selectors';
import { CountryName, ShowCountry, MainMapBlock, MapWrapper } from './ChatMapStyled';
// import { TileLayer } from 'react-leaflet/TileLayer';
// import { useMap } from 'react-leaflet/hooks';
// import { TileLayer, useMap } from 'react-leaflet';

function ChatMap({closeMap}) {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const token = useSelector(getPersistedToken);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState({});
  
  // const onCountryHover = e => {
  //   const countryName = e.target.feature.properties.ADMIN;
  //   setSelectedCountry(countryName);
  // };

  let color = [
    'var(--color-blue-1)',
    'var(--color-blue-2)',
    'var(--color-blue-3)',
    'var(--color-blue-4)',
    'var(--color-blue-5)',
    'var(--color-brand-blue)',
    'var(--color-blue-7)',
    'var(--color-blue-8)',
    'var(--color-blue-9)',
    'var(--color-blue-10)',
  ];

  const countryStyle = {
    fillOpacity: 1,
    color: 'var(--color-dark)',
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
        setSelectedCountry(data.name);
        setCountryData(data);
        // dispatch(
        //   sendDataCountryToBackend({ userId, countryDto: countryData, token })
        // );
        console.log('data to send', countryData);
      },
      mouseover: e => {
        // e.target.setStyle({
        //   color: 'var(--white-color)',
        //   // fillOpacity: 0.2,
        // });
        // const countryName = e.target.feature.properties.ADMIN;
        // onCountryHover(e);

        // layer.bindPopup(e.target.feature.properties.ADMIN).openPopup();
      },
      // mouseout: e => {
      //   e.target.setStyle({
      //     color: 'var(--color-dark)',
      //     // fillOpacity: 1,
      //   });
      // },
    });
  };

  const handleClick = () => {
    dispatch(
      sendDataCountryToBackend({ userId, countryDto: countryData, token })
    );
    closeMap();
  }

  return (
    <MainMapBlock>
      <MapWrapper zoom={2.3} center={[40, 0]}>
        <GeoJSON
          style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
        <ShowCountry>
          <CountryName>{selectedCountry}</CountryName>
          <button onClick={handleClick} >Join</button>
        </ShowCountry>
        {/* <CountryName>{selectedCountry}</CountryName> */}
      </MapWrapper>
    </MainMapBlock>
  );
};

ChatMap.propTypes = {
  closeMap: PropTypes.func,
};

export default ChatMap;
