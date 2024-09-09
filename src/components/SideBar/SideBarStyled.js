import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import { LuLogOut, LuMessagesSquare } from 'react-icons/lu';
import { TbUser, TbUsers } from 'react-icons/tb';

const iconProperties = (width = '24px', height = '48px', marginRight = '0') => `
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
  line-height: 20px;
  letter-spacing: -0.011em;
  color: var(--color-grey-9);
`;

export const UserIcon = styled(TbUser)`
  ${iconProperties()};
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
