import React from 'react';
import styled from 'styled-components';
import backgroundImage from '@/images/bg-png.png'
import FBLogo from '@/images/icons/FBLogo.svg'
import GoogleLogo from '@/images/icons/GoogleLogo.svg'
import ErrorIcon from '@/images/icons/IconStroke.svg'

export const Background = styled.section`
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  @media (min-width: 767px) {
    background: url(${backgroundImage});
    background-size: cover;
  }
`;

export const RegisterFormContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  @media (max-width: 767px) {
    max-width: 500px;
    justify-content: center;
    align-items: stretch;
    margin: 24px 36px;
  }
  @media (min-width: 768px) {
    max-width: 600px;
    background: var(--color-grey-4);
    width: 100%;
    min-height: 584px;
    justify-content: center;
    align-items: center;
    overflow: auto;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

export const SignInFormStyles = styled.form`
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: stretch;
    padding: 56px 120px;
  }
`;

export const SignInTitle = styled.h1`
  margin-bottom: 8px;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: center;
    margin-bottom: 8px;
  }

  @media (min-width: 768px) {
    font-size: 48px;
    line-height: 57.6px;
  }
`;

export const SignInText = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;

  @media (max-width: 767px) {
    margin-bottom: 32px;
  }

  @media (min-width: 768px) {
    font-weight: 400;
    margin-bottom: 48px;
  }
`;

export const LoginLink = styled.a`
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  color: var(--color-brand-blue);
  cursor: pointer;
`;

export const ValidationIcon = styled.div`
  display: ${({ alt }) => alt === 'error' ? 'block' : 'none'};
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  background-image: url(${ErrorIcon});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 19px;
  right: 20px;
`;


export const SignUpBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;
  letter-spacing: -0.28px;
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: var(--color-brand-blue);
  box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
  cursor: pointer;
  color: var(--white-color);
  
  &:hover {
    background: var(--color-blue-5);
  }

  &:focus {
    background: var(--color-blue-5);
  }

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 19.2px;
    letter-spacing: -0.36px;
  }
`;

export const Separator = styled.hr`
    position: relative;
    border: 0;
    margin: 24px 0;
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: center;
    
    &::before {
      content: '';
      background: var(--color-grey-7);
      position: absolute;
      top: 50%;
      width: 100%;
      height: 1px;
    }
    
    &::after {
      content: 'or';
      position: relative;
      padding: 10px 24px;
      color: var(--color-grey-7);
      background-color: var(--white-color);
      line-height: 1;
    }

    @media (min-width: 768px) {
      &::after {
      background-color: var(--color-grey-4);
    }
      color: var(--color-grey-7);
      margin: 32px 0;
    }
`;

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 250px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const GoogleButton = styled.button`
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

const GoogleLogoSVG = styled.svg`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  background-image: url(${GoogleLogo});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const ButtonGoogle = () =>
// eslint-disable-next-line arrow-body-style
{
  return (
    React.createElement(GoogleButton, null,
      React.createElement(GoogleLogoSVG, null,
      ),
      React.createElement("span", null, "Google"))
  )
};

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

const FacebookLogoSVG = styled.svg`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  background-image: url(${FBLogo});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const ButtonFacebook = () =>
// eslint-disable-next-line arrow-body-style
{
  return (
    React.createElement(FacebookButton, null,
      React.createElement(FacebookLogoSVG, null,
      ),
      React.createElement("span", null, "Facebook"))
  )
};