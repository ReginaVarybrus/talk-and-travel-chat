import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import PropTypes from 'prop-types';
import { useFetch } from '@/hooks/useFetch.js';
import URLs from '@/constants/constants';
import { GeoJSON } from 'react-leaflet';
import mapData from '@/data/countries.json';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
import 'leaflet/dist/leaflet.css';

import {
  ChatMapStyled,
  MapStyled,
  ShowCountryStyled,
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

const ChatMap = ({
  openMap,
  closeMap,
  setChatData,
  setParticipantsAmount,
  setIsSubscribed,
  subscriptionRooms,
  setIsShowJoinBtn,
  setIsChatVisible,
}) => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { responseData } = useFetch(
    selectedCountry ? URLs.getMainCountryChatByName(selectedCountry) : null
  );

  const onEachCountry = (country, layer) => {
    const colorIndex = Math.floor(Math.random() * color.length);
    layer.options.fillColor = color[colorIndex];

    layer.on({
      click: e => {
        const data = {
          name: e.target.feature.properties.admin,
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

  const handleOpenClick = () => {
    const nameOfCountry = subscriptionRooms.find(
      item => item.name === selectedCountry
    );
    if (nameOfCountry) {
      setIsShowJoinBtn(false);
    } else {
      setIsShowJoinBtn(true);
    }

    if (responseData) {
      setChatData(responseData);
      setParticipantsAmount(responseData.usersCount);
      setIsSubscribed(true);
    }
    if (!isDesktop) {
      setIsChatVisible(true);
    }

    closeMap();
  };

  return (
    <ChatMapStyled>
      <MapStyled zoom={2.3} center={[40, 0]} inert={!openMap}>
        <GeoJSON
          style={countryStyle}
          data={mapData}
          onEachFeature={onEachCountry}
        />
        {selectedCountry && (
          <ShowCountryStyled>
            <CountryName>{selectedCountry}</CountryName>
            <BasicButton
              variant="contained"
              color="primary"
              sx={{
                marginTop: '12px',
              }}
              text="Open chat"
              handleClick={handleOpenClick}
            />
          </ShowCountryStyled>
        )}
      </MapStyled>
    </ChatMapStyled>
  );
};

ChatMap.propTypes = {
  openMap: PropTypes.bool,
  closeMap: PropTypes.func,
  setChatData: PropTypes.func,
  setParticipantsAmount: PropTypes.func,
  setIsSubscribed: PropTypes.func,
  subscriptionRooms: PropTypes.array,
  setIsShowJoinBtn: PropTypes.func,
};

export default ChatMap;
