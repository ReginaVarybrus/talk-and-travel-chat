import styled from 'styled-components';

export const TextButtonStyled = styled.label`
width: 120px;
height: 36px;
padding: 8px 16px;
border-radius: 8px;
border: none;
background-color: transparent;
cursor: pointer;
font-size: 14px;
font-weight: 400;
line-height: 19.6px;
text-align: center;
color: var(--color-brand-blue);
white-space: nowrap;

&:hover {
    font-weight: 700;
}
`;