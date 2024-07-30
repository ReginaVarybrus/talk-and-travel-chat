import { useState } from 'react';
import PropTypes from 'prop-types';
import { GeoJSON } from 'react-leaflet';
import mapData from '@/data/countries.json';
import 'leaflet/dist/leaflet.css';
import '@/css/ChatMap.css';

import {
  CountryName,
  ShowCountry,
  MainMapBlock,
  MapWrapper,
} from './ChatMapStyled';

const ChatMap = ({ closeMap }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const color = [
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
          <button type="button" onClick={handleClick}>
            Join
          </button>
        </ShowCountry>
      </MapWrapper>
    </MainMapBlock>
  );
};

ChatMap.propTypes = {
  closeMap: PropTypes.func,
};

export default ChatMap;
