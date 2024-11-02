import styled from 'styled-components';
import Button from '@mui/material/Button';
import { LuLogOut, LuPencil, LuX } from 'react-icons/lu';

export const ProfileStyled = styled.section`
background-color: var(--color-grey-3);
height: 100vh;
border-left: 1px solid var(--color-grey-6);

@media (max-width: 767px) {
    padding: 16px 24px 0 24px;
    border-left: none;
    display: flex;
    flex-direction: column;
    align-items: center;
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
max-width: 1045px;
background-color: var(--white-color);
display: grid;
grid-template-columns: auto 2fr auto;
grid-template-areas: "avatar form edit";
margin: 32px;
border-radius: 16px;
padding: 32px;
min-height: 320px;
box-sizing: border-box;

@media (max-width: 767px) {
    grid-template-columns: 1fr auto;
    grid-template-areas:
        "avatar edit" 
        "form form"
        "logout logout";
    margin: 0;
    padding: 0;
    max-width: 450px;
}
`;

export const AvatarBlock = styled.div`
text-align: center;
grid-area: avatar;
display: flex;
flex-direction: column;

@media (max-width: 767px) {
    flex-direction: row;
    margin: 12px 12px 24px 12px;
}
`

export const Avatar = styled.img`
width: 256px;
height: 256px;
border-radius: 8px;
background-color: var(--color-grey-3);
object-fit: cover;

@media (max-width: 767px) {
    width: 64px;
    height: 64px;
}
`;

export const ChangeAvatar = styled(Button)`
padding-top: 8px;
color: var(--color-brand-blue);
width: 120px;

@media (max-width: 767px) {
    padding: 8px 16px;
}
`
export const AvatarVisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const InputBlock = styled.div`
grid-area: form;
margin: 0px 48px;
min-width: 300px;

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
white-space: pre-wrap;
padding: 18px 16px;
font-size: 18px;
font-weight: 400;
line-height: 21.6px;
text-align: left;
border: 1px solid;
border-color: transparent;
`

export const EditPencilIcon = styled(LuPencil)`
width: 18px;
height: 18px;
color: var(--color-grey-9);
`
export const CloseIcon = styled(LuX)`
width: 20px;
height: 20px;
color: var(--color-grey-9);
`

export const EditButton = styled.button`
grid-area: edit;
width: 18px;
height: 18px;
background-color: var(--white-color);
border: none;
outline: none;
cursor: pointer;

@media (max-width: 768px) {
    margin: 14.5px 14.5px 0 0;
}
`

export const ChoiceButtonBlock = styled.div`
display: grid;
gap: 16px;
grid-template-columns: 92px 92px auto;

@media (max-width: 768px) {
    display: grid;
    gap: 19px;
    grid-template-columns: 1fr 1fr;
    padding-bottom: 12px;
}
`

export const LogoutButton = styled(Button)`
&& {
    margin-top: 24px;
    width: 100%;
    height: 48px;
    padding: 12px 0;
    border-radius: 8px;
    background-color: var(--white-color);
    cursor: pointer;
    color: var(--color-system-error);
    text-transform: none;
    font-size: 14px;
    line-height: 19.6px;


    @media (min-width: 768px) {
        display: none;
    }
}
`

export const LogoutIcon = styled(LuLogOut)`
width: 24px;
height: 24px;
margin: 12px 12px 12px 0;
`


