import styled, { keyframes } from 'styled-components';
import { device } from '@/constants/mediaQueries';

const fadeInFromBottom = keyframes`
  from {
    opacity: 0; 
    transform: translateY(10px); 
  }
  to {
    opacity: 1; 
    transform: translateY(0); 
  }
`;

export const MessageItemStyled = styled.li`
  display: flex;
  align-items: end;
  margin-left: 32px;
  margin-bottom: ${({ $isShownAvatar }) => ($isShownAvatar ? '16px' : '8px')};

  @media ${device.tablet} {
    margin-bottom: ${({ $isShownAvatar }) => ($isShownAvatar ? '24px' : '8px')};
  }
`;

export const MessageContentStyled = styled.div`
  max-width: 190px;
  padding: 16px;
  border-radius: 8px;
  position: relative;

  margin-left: ${({ $isShownAvatar }) => ($isShownAvatar ? '16px' : '64px')};
  background: ${({ $backgroundMessage }) =>
    $backgroundMessage ? 'var(--white-color)' : 'var(--color-blue-1)'};

  @media ${device.mobileM} {
    max-width: 275px;
  }

  @media ${device.tablet} {
    max-width: 280px;
  }

  opacity: 0;
  animation: ${fadeInFromBottom} 0.3s ease forwards;
`;

export const Avatar = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  cursor: ${({ $isCurrentUser, $isPrivateChat }) =>
    $isCurrentUser || $isPrivateChat ? 'default' : 'pointer'};
`;

export const LetterAvatarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
  background: var(--color-grey-6);
  color: var(--white-color);
`;

export const ImgAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
  display: ${({ $userAvatarUrl }) => ($userAvatarUrl ? 'block' : 'none')};
`;

export const ContentMessage = styled.p`
  text-align: start;
  font-size: 14px;
  word-break: break-word;
  white-space: pre-wrap;
  color: var(--color-dark);
  user-select: text;
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

export const Badge = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  background: var(--color-grey-3);
  width: 14px;
  height: 14px;
  border-radius: 50%;

  &:after {
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-badge);
  }
`;

export const ButtonReply = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  border: none;
  background-color: transparent;
  color: var(--color-blue-3);
  transition: all 0.3s ease;

  &:hover,
  &:focus,
  &:active {
    color: var(--color-blue-4);
  }

  @media (hover: hover) {
    opacity: 0;
    visibility: hidden;

    ${MessageContentStyled}:hover & {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const ReplyingMessage = styled.div`
  background: ${({ $backgroundMessage }) =>
    $backgroundMessage ? 'var(--color-blue-1)' : 'var(--color-grey-2)'};
  padding: 4px 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;

  p {
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-grey-8);
  }
`;

export const MessageBox = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export const MessageAttachBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

export const NameBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  h5 {
    color: var(--color-blue-5);
    font-weight: 800;
    font-size: 12px;
  }
  svg {
    color: var(--color-blue-5);
    width: 11px;
    height: 11px;
  }
`;

export const AttachmentImage = styled.img`
  width: 120px;
  height: 120px;
  margin: 10px 0;
  object-fit: contain;
  cursor: pointer;
  @media ${device.mobileL} {
    width: 170px;
    height: 170px;
  }
  @media ${device.tablet} {
    width: 200px;
    height: 200px;
  }
`;
