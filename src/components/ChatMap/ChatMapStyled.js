import styled from 'styled-components';
import { MapContainer } from 'react-leaflet/MapContainer';

export const CountryName = styled.h2`
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translate(-50%, 0);
`; 

export const ShowCountry = styled.h2`
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translate(-50%, 0);
`; 

export const MainMapBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`; 

export const MapWrapper = styled(MapContainer)`
    width: 90vw;
    height: 90vh;
`;
