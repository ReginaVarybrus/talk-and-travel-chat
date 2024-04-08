import styled from 'styled-components';
import { LuLogOut, LuMessagesSquare } from 'react-icons/lu';
import { TbUser, TbUsers } from 'react-icons/tb';

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
  margin: 48px 0;
`;

export const Text = styled.p`
  line-height: 20px;
  letter-spacing: -0.011em;
  color: var(--color-grey-9);
`;

export const UserIcon = styled(TbUser)`
  width: 24px;
  height: 48px;
  stroke: var(--color-grey-9);
`;

export const RoomsIcon = styled(TbUsers)`
  width: 24px;
  height: 48px;
  stroke: var(--color-grey-9);
`;

export const DMsIcon = styled(LuMessagesSquare)`
  width: 24px;
  height: 48px;
  stroke: var(--color-grey-9);
`;

export const LogoutIcon = styled(LuLogOut)`
  width: 24px;
  height: 48px;
  stroke: var(--color-grey-9);
`;

export const SideBarButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 56px;
  height: 76px;
  cursor: pointer;

  &:hover {
    ${Text} {
      color: var(--color-blue-3);
    }
    ${DMsIcon}, ${RoomsIcon}, ${UserIcon}, ${LogoutIcon} {
      stroke: var(--color-blue-3);
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
