import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { GeoJSON } from 'react-leaflet';
import mapData from '../../data/countries.json';
import 'leaflet/dist/leaflet.css';
import '../../css/ChatMap.css';

import { sendDataCountryToBackend } from '../../redux-store/AuthOperations/AuthOperations.js';
import {
  getUserId,
  getPersistedToken,
} from 'redux-store/AuthOperations/selectors';
import {
  CountryName,
  ShowCountry,
  MainMapBlock,
  MapWrapper,
} from './ChatMapStyled';
// TODO
// import { useMap } from 'react-leaflet/hooks';

const ChatMap = ({ closeMap }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const token = useSelector(getPersistedToken);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState({});

  // TODO
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
      },
      mouseover: e => {
        e.target.setStyle({
          color: 'var(--white-color)',
        });
      },
      mouseout: e => {
        e.target.setStyle({
          color: 'var(--color-dark)',
        });
      },
    });
  };

  const handleClick = () => {
    dispatch(
      sendDataCountryToBackend({ userId, countryDto: countryData, token })
    );
    closeMap();
  };

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
          <button onClick={handleClick}>Join</button>
        </ShowCountry>
      </MapWrapper>
    </MainMapBlock>
  );
};

ChatMap.propTypes = {
  closeMap: PropTypes.func,
};

export default ChatMap;
