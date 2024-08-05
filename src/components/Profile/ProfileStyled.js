import styled from 'styled-components';
import PencilIcon from '@/images/icons/pencil_edit_icon.svg'
import CloseIcon from '@/images/icons/cross_close_icon.svg'

export const ProfileStyled = styled.section`
background-color: var(--color-grey-3);
`;

export const Header = styled.div`
height: 77px;
background-color: var(--white-color);
border-bottom: solid 1px var(--color-grey-6);
`;

export const Title = styled.h5`
padding: 24px 32px;
font-size: 24px;
font-weight: 600;
line-height: 28.8px;
`;

export const ProfileContainer = styled.div`
min-width: 1045px;
background-color: var(--white-color);
display: flex;
margin: 32px;
min-height: 320px;
`;

export const Avatar = styled.div`
width: 256px;
height: 256px;
background-color: var(--color-grey-12);
`;

export const InputBlock = styled.div`
min-width: 605px;
`;

export const EditButton = styled.button`
width: 18px;
height: 18px;
background-image: url(${props => props.$icon === 'edit' ? PencilIcon : CloseIcon});
background-position: center;
background-size: contain;
background-color: var(--white-color);
border: none;
outline: none;
cursor: pointer;
`;
