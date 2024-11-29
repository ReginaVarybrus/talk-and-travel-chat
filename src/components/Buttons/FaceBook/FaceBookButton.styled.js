import styled from 'styled-components';
import { MdFacebook } from 'react-icons/md';

export const FacebookButton = styled.button`
  width: 100%;
  min-width: 90px;
  height: 44px;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid var(--color-brand-blue);
  background-color: var(--white-color);
  display: flex;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  span {
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
  }

  &:hover {
    background-color: var(--color-blue-1);
  }

  @media (min-width: 768px) {
    background-color: var(--color-grey-4);
  }
`;

export const FacebookLogoSVG = styled(MdFacebook)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  color: var(--color-brand-blue);
`;
