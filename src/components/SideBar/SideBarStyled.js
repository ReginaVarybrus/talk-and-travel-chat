import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import { LuLogOut, LuMessagesSquare } from 'react-icons/lu';
import { TbUsers } from 'react-icons/tb';

export const iconProperties = (
  width = '24px',
  height = '48px',
  marginRight = '0'
) => `
  width: ${width};
  height: ${height};
  margin-right: ${marginRight};
  stroke: var(--color-grey-9);
`;

export const SideBarStyled = styled.div`
  display: none;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: var(--color-blue-1);
  }
`;

export const ButtonsFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 48px 0;
`;

export const Text = styled.p`
  text-align: center;
  line-height: 20px;
  letter-spacing: -0.011em;
  word-break: break-word;
  color: var(--color-grey-9);
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
`;

export const ImgAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
`;

export const RoomsIcon = styled(TbUsers)`
  ${iconProperties('24px', '24px', '12px')};
  @media ${device.tablet} {
    ${iconProperties()};
  }
`;

export const DMsIcon = styled(LuMessagesSquare)`
  ${iconProperties('24px', '24px', '12px')};
  @media ${device.tablet} {
    ${iconProperties()};
  }
`;

export const LogoutIcon = styled(LuLogOut)`
  ${iconProperties()};
`;

export const SideBarButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 56px;
  height: 76px;
  cursor: pointer;
  position: relative;
  color: ${({ $isActive }) =>
    $isActive ? 'var(--color-brand-blue)' : 'var(--color-grey-9)'};
  transition: color 0.3s;

  ${Text} {
    color: currentColor;
    font-weight: ${({ $isActive }) => $isActive && 'bolder'};
  }

  svg {
    stroke: currentColor;
  }

  &:hover {
    color: var(--color-blue-3);

    svg {
      stroke: currentColor;
    }
  }
`;

export const ChatsButtonsFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 51px;
  height: 166px;
`;

export const UnreadMessagesCount = styled.div`
  border-radius: 50px;
  color: var(--white-color);
  font-size: 12px;
  font-weight: 500;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-blue-5);
  padding: 4px 8px;
  position: absolute;
  left: 55%;
  top: 2px;
`;
