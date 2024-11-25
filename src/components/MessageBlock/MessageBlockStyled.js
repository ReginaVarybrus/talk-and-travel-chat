import styled from 'styled-components';
// import { device } from '@/constants/mediaQueries';

export const MessageBlockStyled = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  overflow-y: auto;
  width: 100%;
  background: var(--color-grey-3);
  transition: height 0.3s ease;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-5);
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    height: 144px;
    border-radius: 100px;
    background: var(--color-grey-9);
  }
`;

export const NoMassegesNotification = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Logo = styled.img`
  width: 200px;
  height: 160px;
  margin-bottom: 20px;
  stroke: var(--color-brand-blue);
`;

export const LoaderStyleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
