import React from 'react';
import styled from 'styled-components';
import backgroundImage from '@/images/bg-png.png'
import FBLogo from '@/images/icons/FBLogo.svg'
import GoogleLogo from '@/images/icons/GoogleLogo.svg'
import ErrorIcon from '@/images/icons/IconStroke.svg'

export const Background = styled('section')({
  boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  '@media (min-width: 767px)': {
    background: `url(${backgroundImage})`,
    backgroundSize: 'cover'
  }
})

export const RegisterFormContainer = styled('div')({
  display: 'flex',
  textAlign: 'center',
  flexDirection: 'column',
  '@media (max-width: 767px)': {
    maxWidth: '500px',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: '24px 36px',
  },
  '@media (min-width: 768px)': {
    maxWidth: '600px',
    background: '#F2F2F2',
    width: '100%',
    minHeight: '584px',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    borderRadius: '16px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
});

export const SignInFormStyles = styled('form')({
  '@media (min-width: 768px)': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '56px 120px',
  },
});

export const SignInTitle = styled('h1')({
  marginBottom: '8px',
  fontWeight: '600',
  '@media (max-width: 767px)': {
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0em',
    textAlign: 'center',
    marginBottom: '8px',
  },
  '@media (min-width: 768px)': {
    fontSize: '48px',
    lineHeight: '57,6px',
  },
});

export const SignInText = styled('p')({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '19px',
  letterSpacing: '0em',
  '@media (max-width: 767px)': {
    marginBottom: '32px',
  },
  '@media (min-width: 768px)': {
    fontWeight: '400',
    marginBottom: '48px',
  },
});

export const LoginLink = styled('a')({
  fontSize: '16px',
  fontWeight: '400',
  textDecoration: 'none',
  color: '#256AD2',
});

export const ItemWrapp = styled('div')({
  position: 'relative',
});

export const StyledLabel = styled('label')(
  ({ color = { error: '', touched: false } }) => ({
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '8',
    color:
      color.error && color.touched
        ? 'DA1414'
        : !color.error && color.touched
          ? 'green'
          : '#111',
  })
);

export const StyledInput = styled('input')(
  ({ color = { error: '', touched: false } }) => ({
    '@media (min-width: 768px)': {
      width: '360px',
    },
    width: '100%',
    color: '#111',
    fontSize: '14px',
    lineHeight: '18px',
    boxSizing: 'border-box',
    height: '56px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor:
      color.error && color.touched
        ? '#DA1414'
        : !color.error && color.touched
          ? 'green'
          : '#111',

    marginBottom: 24,
    paddingLeft: 14,
    ':hover': {
      border: '1px solid #111',
    },
    '::placeholder': {
      color: '#DCE3E5',
    },
  })
);

export const Error = styled('p')({
  position: 'absolute',
  top: 60,
  left: 10,
  color: '#DA1414',
  fontSize: '12px',
  lineHeight: '14px',
  margin: 0,
  padding: 0,
});

export const Success = styled('p')({
  position: 'absolute',
  top: 60,
  left: 10,
  color: 'green',
  fontSize: '12px',
  lineHeight: '14px',
  margin: 0,
  padding: 0,
});

export const ValidationIcon = styled('div')(
  ({ alt }) => ({
    display: alt === 'error' ? 'block' : 'none',
    width: '20px',
    height: '20px',
    minWidth: '20px',
    minHeight: '20px',
    backgroundImage: `url(${ErrorIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    top: 19,
    right: 20,
  }));


export const SignUpBtn = styled('button')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '19.2px',
  letterSpacing: '-0.28px',
  width: '100%',
  height: 46,
  border: 'none',
  borderRadius: '8px',
  outline: 'none',
  background: '#256AD2',
  boxShadow: ' 4px 2px 16px 0px rgba(136, 165, 191, 0.48)',
  cursor: 'pointer',
  color: '#ffffff',
  '&:hover': {
    background: '#4C85DA',
  },
  '&:focus': {
    background: '#4C85DA',
  },
  '@media (min-width: 768px)': {
    fontSize: '16px',
    lineHeight: '19,2px',
    letterSpacing: '-0.36px',
  },
});

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
      background: #9C9C9C;
      position: absolute;
      top: 50%;
      width: 100%;
      height: 1px;
    }
    &::after {
      content: attr(data-content);
      position: relative;
      padding: 10px 24px;
      color: #9C9C9C;
      background-color: #ffffff;
      line-height: 1;
    }

    @media (min-width: 768px) {
    margin: 32px 0;
}
`;

export const ButtonBlock = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '24px',
  '@media(max-width: 250px)': {
    flexDirection: 'column',
    alignItems: 'center',
  }
})

export const GoogleButton = styled('button')({
  width: '100%',
  minWidth: '90px',
  height: '44px',
  padding: '12px 24px 12px 24px',
  borderRadius: '8px',
  border: '1px solid #256AD2',
  backgroundColor: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  span: {
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '20px',
    letterSpacing: '0em',
    textAlign: 'center',
  },
  '&:hover': {
    backgroundColor: '#E9F0FB'
  }
});

const GoogleLogoSVG = styled('svg')({
  width: '20px',
  height: '20px',
  minWidth: '20px',
  minHeight: '20px',
  backgroundImage: `url(${GoogleLogo})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
});

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

export const FacebookButton = styled('button')({
  width: '100%',
  minWidth: '90px',
  height: '44px',
  padding: '12px 24px 12px 24px',
  borderRadius: '8px',
  border: '1px solid #256AD2',
  backgroundColor: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  span: {
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '20px',
    letterSpacing: '0em',
    textAlign: 'center',
  },
  '&:hover': {
    backgroundColor: '#E9F0FB'
  }
});

const FacebookLogoSVG = styled('svg')({
  width: '20px',
  height: '20px',
  minWidth: '20px',
  minHeight: '20px',
  backgroundImage: `url(${FBLogo})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
});

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