import styled from 'styled-components';
import PencilIcon from '@/images/icons/pencil_edit_icon.svg'
import CloseIcon from '@/images/icons/cross_close_icon.svg'

export const ProfileStyled = styled.section`
background-color: var(--color-grey-3);

@media (max-width: 767px) {
    padding: 16px 24px 0 24px;
}
`;

export const Header = styled.div`
height: 77px;
background-color: var(--white-color);
border-bottom: solid 1px var(--color-grey-6);

@media (max-width: 767px) {
    display: none;
}
`;

export const Title = styled.h5`
padding: 24px 32px;
font-size: 24px;
font-weight: 600;
line-height: 28.8px;
`;

export const ProfileContainer = styled.div`
width: 1045px;
background-color: var(--white-color);
display: flex;
margin: 32px;
border-radius: 16px;
padding: 32px;
min-height: 320px;
box-sizing: border-box;

@media (max-width: 767px) {
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
}
`;

export const AvatarBlock = styled.div`
text-align: center;

@media (max-width: 767px) {
display: flex;
justify-content: space-between;
margin-bottom: 24px;
}
`

export const Avatar = styled.div`
width: 256px;
height: 256px;
border-radius: 8px;
background-color: var(--color-grey-12);

@media (max-width: 767px) {
width: 64px;
height: 64px;
}
`;

export const ChangeAvatar = styled.a`
padding-top: 8px;
color: var(--color-brand-blue);
`

export const InputBlock = styled.div`
margin: 0px 48px;
min-width: 605px;

@media (max-width: 767px) {
margin: 0px 12px;
min-width: 200px;
}   
`;

export const ProfileForm = styled.form`
@media (max-width: 767px) {
display: flex;
flex-direction: column;
}
`
export const TextAbout = styled.p`
hyphens: auto;
word-wrap: break-word;
padding: 18px 16px;
font-size: 18px;
font-weight: 400;
line-height: 21.6px;
text-align: left;
border: 1px solid;
border-color: transparent;
`
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
