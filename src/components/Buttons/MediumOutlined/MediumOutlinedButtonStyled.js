import styled from 'styled-components';

export const MediumOutlinedButtonStyled = styled.button`
width: 92px;
height: 36px;
padding: 8px 24px;
border-radius: 8px;
border: 1px solid var(--color-brand-blue);
color: var(--color-grey-8);
font-weight: 700;
line-height: 19.6px;
text-align: center;
font-size: 14px;
background-color: transparent;
cursor: pointer;
white-space: nowrap;

&:hover {
    font-weight: 700;
    background-color: var(--color-blue-1);
}

@media (max-width: 768px) {
    width: 142px;
  }
`
