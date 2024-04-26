import styled from 'styled-components';
import Button from '@mui/material/Button';


export const BasicButtonLayout = styled(Button)`
&& {
    text-transform: none;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 19.6px;
    text-align: center;
    padding: 12px 24px;

    ${(props) =>
    props.variant === 'outlined'
      ? `
          border: 1px solid var(--color-brand-blue);
          background-color: var(--white-color);
          color: var(--color-grey-8);
          &:hover {
            background-color: var(--color-blue-1);
          }
        `
      : `
          border: none;
          background-color: var(--color-brand-blue);
          &:hover {
            background-color: var(--color-blue-5);
          }
        `
  };
  }
`;