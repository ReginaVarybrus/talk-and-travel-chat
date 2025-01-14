import { createGlobalStyle } from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const GlobalStyles = createGlobalStyle`
:root {
  --color-success: #33d844;
  --color-error: #d83333;
  --color-info: #569aff;
  --color-system-error: #F55151;

  --white-color: #ffffff;
  --color-grey-2: #fdfdfd;
  --color-grey-3: #f6f6f6;
  --color-grey-4: #f2f2f2;
  --color-grey-5: #dedede;
  --color-grey-6: #c8c8c8;
  --color-grey-7: #9c9c9c;
  --color-grey-8: #6f6f6f;
  --color-grey-9: #5e5e5e;
  --color-grey-10: #434343;
  --color-grey-11: #3d3d3d;
  --color-grey-12: #343434;
  --color-grey-13: #79747E;
  --color-grey-14: #49454F;
  --color-dark: #222222;

  --color-brand-blue: #256ad2;
  --color-blue-1: #e9f0fb;
  --color-blue-2: #cbdbf4;
  --color-blue-3: #a1bfec;
  --color-blue-4: #76a1e3;
  --color-blue-5: #4c85da;
  --color-blue-7: #1f5ab3;
  --color-blue-8: #1a4b95;
  --color-blue-9: #153c78;
  --color-blue-10: #11305e;

  --color-badge: #72CF7B;
}

body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  user-select: none;
  box-sizing: border-box;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li{
    list-style: none;
    margin: 0;
    padding: 0;
    text-decoration: none;
}

h1,h2,h3,h4,h5,h6,p{
  margin: 0;
  padding: 0;
  color: var(--color-dark);
}

h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 28.8px;
  @media ${device.tablet} {
    font-size: 24px;
  }
}

h5 {
  font-size: 16px;
  font-weight: 600;
  line-height: 19.2px;
  color: var(--color-dark);
  @media ${device.tablet} {
    font-size: 18px;
    line-height: 21.6px;
  }
}

h6 {
  font-size: 18px;
  font-weight: 700;
  line-height: 19px;
} 

p {
  font-size: 14px;
  font-weight: 400;
  @media ${device.tablet} {
    font-size: 16px;
  }
}

button {
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  font-weight: 700;
  line-height: 19.2px;
  text-align: center;
}

svg{
  margin: 0;
  padding: 0;
}

// Background for login with google

.dim-background {
  background: rgba(0, 0, 0, 0.5); 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  pointer-events: none; 
}



// MapStyles

.leaflet-container {
  position: relative;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: -1px 1px 3px 1px rgba(0, 0, 0, 0.15);
}

.leaflet-control-zoom {
  visibility: hidden;
}

.leaflet-bar {
  display: flex;
}

.leaflet-touch .leaflet-bar a {
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.leaflet-bar a:first-child {
  border-right: 1px solid var(--color-grey-5);
  border-bottom: none;
}

.leaflet-left .leaflet-control {
  margin-left: 0;
}

.leaflet-top .leaflet-control {
  margin-top: 0;
}
`;
