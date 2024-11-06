import styled from 'styled-components';

export const MediumFilledButtonStyled = styled.button`
width: 92px;
height: 36px;
padding: 8px 24px;
border-radius: 8px;
border: 1px solid var(--color-brand-blue);
color: var(--white-color);
font-weight: 700;
line-height: 19.6px;
text-align: center;
font-size: 14px;
background-color: var(--color-brand-blue);
cursor: pointer;
white-space: nowrap;

&:hover {
    background-color: var(--color-blue-5);
}

@media (max-width: 768px) {
    width: 142px;
  }
`
