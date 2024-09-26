import styled from 'styled-components';
import Button from '@mui/material/Button';
import buttonVariants from '@/components/Buttons/BasicButton/BasicButtonTypes';

export const BasicButtonLayout = styled(Button)`
&& {
    text-transform: none;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 19.6px;
    text-align: center;
    padding: 12px 24px;
    border-radius: 4px;
    border: 1px 0px 0px 0px;
    opacity: 0px;

    ${(props) =>
  {
    if (props.variant === buttonVariants.CONTAINED) {
      return `
          border: none;
          color: var(--white-color);
          background-color: var(--color-brand-blue);
          &:hover {
            background-color: var(--color-blue-5);
          }
        `;
    }
    if (props.variant === buttonVariants.OUTLINED) {
      return `
          border: 1px solid var(--color-brand-blue);
          background-color: var(--white-color);
          color: var(--color-grey-8);
          &:hover {
            background-color: var(--color-blue-1);
          }
        `;
    }
    if (props.variant === buttonVariants.TRANSPARENT) {
      return `
          border: none;
          background-color: var(--white-color);
          color: var(--color-brand-blue);
          font-weight: 400;
          &:hover {
            background-color: var(--white-color);
            font-weight: 700;
          }
        `;
    }
  }}
  }
`;