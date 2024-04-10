import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import { LuLogOut, LuMessagesSquare } from 'react-icons/lu';
import { TbUser, TbUsers } from 'react-icons/tb';

const iconProperties = (width = '24px', height = '48px') => `
  width: ${width};
  height: ${height};
  stroke: var(--color-grey-9);
  `;

export const SideBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: var(--color-blue-1);
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
  ${iconProperties('36px', '24px')};
  @media ${device.tablet} {
    ${iconProperties()};
  }
`;

export const DMsIcon = styled(LuMessagesSquare)`
  ${iconProperties('36px', '24px')};
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
  color: var(--color-blue-3);

  &:hover {
    ${Text} {
      color: currentColor;
    }
    ${DMsIcon}, ${RoomsIcon}, ${UserIcon}, ${LogoutIcon} {
      stroke: currentColor;
    }
  }

  ${Text} {
    color: ${({ $isActive }) =>
      $isActive ? 'var(--color-brand-blue)' : 'var(--color-grey-9)'};
    font-weight: ${({ $isActive }) => ($isActive ? '700' : '400')};
  }
  ${DMsIcon}, ${RoomsIcon}, ${UserIcon} {
    stroke: ${({ $isActive }) =>
      $isActive ? 'var(--color-brand-blue)' : 'var(--color-grey-9)'};
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
