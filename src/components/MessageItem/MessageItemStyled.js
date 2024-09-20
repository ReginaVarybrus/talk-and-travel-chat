import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const MessageItemStyled = styled.li`
  display: flex;
  align-items: end;
  margin-left: 32px;
  margin-bottom: ${({ $isShownAvatar }) => ($isShownAvatar ? '24px' : '8px')};
`;

export const MessageContentStyled = styled.div`
  display: flex;
  align-items: end;
  max-width: 190px;
  padding: 16px;
  border-radius: 8px;
  margin-left: ${({ $isShownAvatar }) => ($isShownAvatar ? '16px' : '64px')};
  background: ${({ $backgroundMessage }) =>
    $backgroundMessage ? 'var(--white-color)' : 'var(--color-blue-1)'};

  @media ${device.mobileM} {
    max-width: 275px;
  }

  @media ${device.tablet} {
    max-width: 280px;
  }
`;

export const LetterAvatarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
  background: var(--color-grey-6);
  color: var(--white-color);
  cursor: ${({ $isCurrentUser }) => ($isCurrentUser ? 'default' : 'pointer')};
`;

export const ContentMessage = styled.p`
  text-align: start;
  font-size: 14px;
  word-break: break-all;
  color: var(--color-dark);

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export const ContentJoinOrLeave = styled.p`
  text-align: start;
  font-size: 14px;
  color: var(--color-grey-6);
`;

export const Time = styled.span`
  text-align: center;
  font-size: 12px;
  margin-left: 8px;
  color: var(--color-grey-9);
`;
