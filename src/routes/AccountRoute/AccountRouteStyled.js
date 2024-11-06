import styled from 'styled-components';
import Button from '@mui/material/Button';
import { LuLogOut, LuPencil, LuX } from 'react-icons/lu';
import { device } from '@/constants/mediaQueries';

export const ProfileStyled = styled.section`
padding: 16px 24px 0 24px;
border-left: none;
display: flex;
flex-direction: column;
align-items: center;
background-color: var(--color-grey-3);
height: 100vh;

@media ${device.tablet} {
    display: block;
    padding: 0;
    border-left: 1px solid var(--color-grey-6);
}
`;

export const Header = styled.div`
display: none;

@media ${device.tablet} {
    display: block; 
    height: 77px;
    background-color: var(--white-color);
    border-bottom: solid 1px var(--color-grey-6);
}
`;

export const Title = styled.h5`
padding: 24px 32px;
font-size: 24px;
font-weight: 600;
line-height: 28.8px;
`;

export const ProfileContainer = styled.div`
background-color: var(--white-color);
border-radius: 16px;
display: grid;
grid-template-columns: 1fr auto;
grid-template-areas:
    "avatar edit" 
    "form form"
    "logout logout";
margin: 0;
padding: 12px;
width: 100%;
max-width: 450px;

@media ${device.tablet} {
    width: auto;
    max-width: 1045px;
    grid-template-columns: auto 2fr auto;
    grid-template-areas: "avatar form edit";
    gap: 48px;
    margin: 32px;
    padding: 32px;
    min-height: 320px;
}
`;

export const AvatarBlock = styled.div`
display: flex;
flex-direction: row;
align-items: center;
grid-area: avatar;

@media ${device.tablet} {
    gap: 8px;
    flex-direction: column;
}
`;

export const Avatar = styled.img`
width: 64px;
height: 64px;
border-radius: 8px;
background-color: var(--color-grey-3);
object-fit: cover;

@media ${device.tablet} {
    width: 256px;
    height: 256px;
}
`;

export const InputBlock = styled.div`
grid-area: form;
margin-top: 24px;
min-width: 200px;

@media ${device.tablet} {
    min-width: 300px;
    margin-top: 5px;
}
`;

export const ProfileForm = styled.form`
gap: 8px;

@media ${device.tablet} {
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

export const EditButton = styled.button`
grid-area: edit;
width: 24px;
height: 24px;
padding: 0;
background-color: var(--white-color);
border: none;
outline: none;
cursor: pointer;
`

export const EditPencilIcon = styled(LuPencil)`
width: 24px;
height: 24px;
color: var(--color-grey-9);
`
export const CloseIcon = styled(LuX)`
width: 24px;
height: 24px;
color: var(--color-grey-9);
`


export const ChoiceButtonBlock = styled.div`
display: flex;
gap: 19px;
padding-bottom: 12px;
justify-content: space-between;

@media ${device.tablet} {
    display: grid;
    gap: 16px;
    grid-template-columns: 92px 92px 1fr;
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
    max-width: 450px;
    width: 100%;
    &:hover {
        font-weight: 700;
        background-color: var(--white-color);
    }

    @media ${device.tablet} {
            display: none;
        }
}
`

export const LogoutIcon = styled(LuLogOut)`
width: 24px;
height: 24px;
margin: 12px 12px 12px 0;
`
