import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import { IoIosArrowBack } from 'react-icons/io';

export const ChatHeaderStyled = styled.header`
  display: flex;
  /* align-items: center; */
  width: 100%;
  background: var(--white-color);
  border-bottom: 1px solid var(--color-grey-6);

  p {
    font-size: 14px;
    line-height: 20px;
    color: var(--color-grey-9);
    transition: color 0.3s;
  }
`;

export const MobileHeaderStyled = styled.div`
  display: flex;
  justify-content: center;
  min-height: 67px;
  align-items: center;
  padding: 0 24px;

  p {
    font-size: 14px;
    line-height: 20px;
    color: var(--color-grey-9);
    transition: color 0.3s;
  }

  @media ${device.tablet} {
    display: none;
  }
`;

export const MobileHeaderContentStyled = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const DesktopHeaderStyled = styled.div`
  display: none;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    min-height: 75px;
    justify-content: center;
    padding-left: 32px;

    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: var(--color-grey-9);
      transition: color 0.3s;
    }

    &:hover {
      cursor: pointer;
    }
    &:hover p {
      color: var(--color-blue-3);
    }
  }
`;

export const HeaderButton = styled.button`
  display: flex;
  width: 24px;
  padding: 0;
  background: none;
  cursor: pointer;
  color: var(--color-grey-9);
  @media ${device.tablet} {
    display: none;
  }
`;

export const BackIcon = styled(IoIosArrowBack)`
  width: 24px;
  height: 24px;
  /* stroke: var(--color-grey-9); */
`;

export const FlagImg = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 12px;
`;
