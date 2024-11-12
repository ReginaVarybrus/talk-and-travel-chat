import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const Container = styled.div`
  position: relative;
  background-color: var(--color-blue-1);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
`;

export const ContentBox = styled.div`
  z-index: 10;
  h1 {
    color: var(--color-grey-12);
    font-size: 100px;
    font-weight: 200;
  }

  h3 {
    color: var(--color-grey-12);
    font-size: 18px;
  }

  p {
    color: var(--color-grey-9);
    font-size: 12px;
    margin-bottom: 25px;
  }

  a {
    font-size: 16px;
    font-weight: 700;
    padding: 12px 24px;
    background-color: var(--color-brand-blue);
    box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
    color: var(--white-color);
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  a:hover,
  a:focus,
  a:active {
    background: var(--color-blue-5);
  }

  @media ${device.tablet} {
    h1 {
      font-size: 236px;
    }
    h3 {
      font-size: 28px;
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
      margin-bottom: 35px;
    }
  }
`;

export const Globe = styled.div`
  position: absolute;
  bottom: 62%;
  left: 5%;
  transform: scale(0.8);
  z-index: 2;

  @media ${device.tablet} {
    transform: scale(1);
    bottom: 31%;
    left: 10%;
  }
`;

export const Star = styled.div`
  position: absolute;
  bottom: 70%;
  left: 70%;
  transform: scale(0.8);
  z-index: 2;
  @media ${device.tablet} {
    transform: scale(1);
    bottom: 10%;
    left: 50%;
  }
`;

export const TelegramBox = styled.div`
  position: absolute;
  bottom: 14%;
  right: 5%;
  transform: scale(0.7);
  z-index: 2;
  @media ${device.tablet} {
    transform: scale(1);
    bottom: 24%;
    right: 4%;
  }

  & > svg:nth-child(1) {
    position: relative;
    left: 100px;
    bottom: 100px;
    z-index: 2;
  }
  & > svg:nth-child(2) {
    position: relative;
    left: -63px;
    top: 53px;
    z-index: 2;
  }
`;
//   position: relative;
//   display: flex;
//   margin: 285px auto 0;
//   width: 252px;
//   height: 150px;
//   justify-content: space-between;
//   align-items: center;
//   font-family: var(--main-font);

//   @media screen and (min-width: 768px) {
//     margin-top: 342px;
//     width: 503px;
//     height: 250px;
//   }
//   @media screen and (min-width: 1440px) {
//     margin-top: 302px;
//     width: 503px;
//     height: 250px;
//   }
// `;

// export const Number = styled('span')`
//   font-size: 100px;
//   font-weight: 700;
//   color: var(--accent);

//   @media screen and (min-width: 768px) {
//     font-size: 200px;
//     line-height: 250px;
//   }
// `;

// export const Image = styled('img')`
//   position: absolute;
//   left: 50%;
//   bottom: -35px;
//   width: 166px;
//   transform: translateX(-50%);

//   @media screen and (min-width: 768px) {
//     left: 50%;
//     bottom: -119px;
//     width: 368px;
//     transform: translateX(-50%);
//   }
// `;

// export const Text = styled('p')`
//   margin: 28px auto 0;
//   width: 260px;
//   text-align: center;

//   font-size: 14px;
//   font-family: var(--main-font);
//   font-weight: 500;
//   line-height: 18px;
//   color: var(--text-404);
//   z-index: 2;

//   @media screen and (min-width: 768px) {
//     margin: 80px auto 0;
//     width: 387px;
//   }
// `;
// export const Link = styled(NavLink)`
//   color: var(--text-404);
// `;
