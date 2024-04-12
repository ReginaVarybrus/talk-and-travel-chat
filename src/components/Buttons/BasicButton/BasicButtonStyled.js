import styled from 'styled-components';

export const BasicButtonLayout = styled.button`
  font-family: Roboto, sans-serif;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;
  letter-spacing: -0.28px;
  height: 46px;
  border: ${props => (props.color === 'white') ? '1px solid var(--color-brand-blue)' : 'none'};
  border-radius: 8px;
  outline: none;
  background: ${props => (props.color === 'white') ? 'var(--white-color)' : 'var(--color-brand-blue)'};
  box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
  cursor: pointer;
  color: ${props => (props.color === 'white') ? 'var(--color-grey-8)' : 'var(--white-color)'};
  
&:hover,
  &:focus {
    background: ${(props) => (props.color === 'white' ? 'var(--color-blue-1)' : 'var(--color-blue-5)')};
  }
`


