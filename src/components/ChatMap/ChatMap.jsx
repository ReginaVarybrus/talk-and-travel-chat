import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { GeoJSON } from 'react-leaflet';
import mapData from '@/data/countries.json';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
import 'leaflet/dist/leaflet.css';

import {
  ChatMapStyled,
  MapWrapper,
  ShowCountry,
  CountryName,
} from './ChatMapStyled';

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

const ChatMap = ({ openMap, closeMap, onCountryRoomDataReceived }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryFlagCode, setCountryFlagCode] = useState(null);
  const userId = useSelector(getUser)?.id;

  const { stompClient, subscribeToCountryRoom, openCountryRoom } =
    useWebSocket();

  useEffect(() => {
    if (stompClient && selectedCountry) {
      subscribeToCountryRoom(
        userId,
        selectedCountry,
        onCountryRoomDataReceived
      );
    }
  }, [stompClient, selectedCountry]);

  const onEachCountry = (country, layer) => {
    const colorIndex = Math.floor(Math.random() * color.length);
    layer.options.fillColor = color[colorIndex];

    layer.on({
      click: e => {
        const data = {
          name: e.target.properties.admin,
          flagCode: e.target.properties.code,
        };
        setSelectedCountry(data.name);
        setCountryFlagCode(data.flagCode);
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

  const handleJoinClick = () => {
    const dataToSend = {
      selectedCountry,
      countryFlagCode,
      userId,
    };
    console.log('map data to send', dataToSend);
    console.log('country data received in map', onCountryRoomDataReceived);
    openCountryRoom(dataToSend);
    closeMap();
  };

  return (
    <ChatMapStyled>
      <MapWrapper zoom={2.3} center={[40, 0]} inert={!openMap}>
        <GeoJSON
          style={countryStyle}
          data={mapData}
          onEachFeature={onEachCountry}
        />
        {selectedCountry && (
          <ShowCountry>
            <CountryName>{selectedCountry}</CountryName>
            <BasicButton
              variant="contained"
              color="primary"
              sx={{
                marginTop: '12px',
              }}
              text="Join"
              handleClick={handleJoinClick}
            />
          </ShowCountry>
        )}
      </MapWrapper>
    </ChatMapStyled>
  );
};

ChatMap.propTypes = {
  openMap: PropTypes.bool,
  closeMap: PropTypes.func,
};

export default ChatMap;
