import styled from 'styled-components';
import { MapContainer } from 'react-leaflet/MapContainer';
import { device } from '@/constants/mediaQueries';

export const ChatMapStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MapStyled = styled(MapContainer)`
  width: 90vw;
  height: 90vh;
`;

export const ShowCountryStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  left: 50%;
  bottom: 30px;
  transform: translate(-50%, 0);
  width: 180px;
  padding: 16px;
  background: var(--color-blue-1);
  border-radius: 16px;
  border: 1px solid var(--color-blue-4);
  z-index: 410;
  @media ${device.tablet} {
    width: 220px;
  }
`;

export const CountryName = styled.h3`
  text-align: center;
`;
