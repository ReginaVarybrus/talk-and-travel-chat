import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const ChatStyled = styled.div`
  display: ${({ $isChatVisible }) => ($isChatVisible ? 'flex' : 'none')};
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: var(--white-color);
  position: relative;
  overflow: hidden;
  @media ${device.tablet} {
    display: flex;
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

export const MessageBlock = styled.div`
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

export const MessageBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 32px;
`;

export const NewMessagesNotification = styled.div`
  position: absolute;
  top: -38px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  background-color: var(--color-blue-5);
  padding: 4px 8px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  color: var(--white-color);

  button {
    border: none;
    background-color: transparent;
    color: inherit;
    gap: 6px;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: var(--color-blue-3);
    }
  }

  .scroll-button {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .divider {
    width: 1px;
    height: 16px;
    background-color: var(--color-blue-2);
  }

  svg {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
`;

export const LoaderStyleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const PositionBox = styled.div`
  width: 100%;
  position: relative;
`;
