import { createGlobalStyle } from 'styled-components';
import { device } from '@/constants/mediaQueries';
import 'simplebar-react/dist/simplebar.min.css';

export const GlobalStyles = createGlobalStyle`
/* !!!Add styles after layout approval!!! */

:root {
  --color-success: #33d844;
  --color-error: #d83333;
  --color-info: #569aff;

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
  --color-dark: #222222;

  --color-blue-1: #e9f0fb;
  --color-blue-2: #cbdbf4;
  --color-blue-3: #a1bfec;
  --color-blue-4: #76a1e3;
  --color-blue-5: #4c85da;
  --color-brand-blue: #256ad2;
  --color-blue-7: #1f5ab3;
  --color-blue-8: #1a4b95;
  --color-blue-9: #153c78;
  --color-blue-10: #11305e;
}

body {
  font-family: "Roboto", sans-serif;
  margin: 0;
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
}

h5 {
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  color: var(--color-dark);
}

h6 {
  font-size: 16px;
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

svg{
  margin: 0;
  padding: 0;
}
`;
