import styled from 'styled-components';

export const LoginFormBackground = styled('div')({
  boxSizing: 'border-box',
  '@media (max-width: 767px)': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '24px 36px',
  },
  '@media (min-width: 768px)': {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
  },
});

export const LoginTitle = styled('h1')({
  fontFamily: 'Roboto sans-serif',
  '@media (max-width: 767px)': {
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '29px',
    letterSpacing: '0em',
    textAlign: 'center',
    marginBottom: '8px',
  },
  '@media (min-width: 768px)': {
    fontSize: '48px',
    fontWeight: '600',
    lineHeight: '19.2px',
    marginBottom: '8px',
  },
});

export const LoginText = styled('p')({
  fontFamily: 'Roboto sans-serif',
  '@media (max-width: 767px)': {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
    letterSpacing: '0em',
    marginBottom: '32px',
  },
  '@media (min-width: 768px)': {
    fontSize: '16px',
    fontWeight: '400',
  },
});

export const SignUpLink = styled('a')({
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: '400',
  textDecoration: 'none',
  color: '#256AD2',
});

export const LoginFormStyles = styled('form')({
  '@media (max-width: 767px)': {
    maxWidth: '500px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  '@media (min-width: 768px)': {
    maxWidth: '600px',
    background: '#F2F2F2',
    width: '100%',
    minHeight: '584px',
    overflow: 'auto',
    backgroundColor: 'white',
    padding: '56px 120px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: '16px',
  },
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
        ? 'red'
        : !color.error && color.touched
          ? 'green'
          : '#111',
  })
);

export const StyledInput = styled('input')(
  ({ color = { error: '', touched: false } }) => ({
    width: '100%',

    color: '#111',
    fontSize: '14px',
    lineHeight: '18px',
    boxSizing: 'border-box',
    height: 48,

    borderRadius: '8px',
    border: '1px solid',

    borderColor:
      color.error && color.touched
        ? 'red'
        : !color.error && color.touched
          ? 'green'
          : 'rgba(220, 227, 229, 0.60)',

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
  top: 72,
  left: 10,

  color: '#DA1414',
  fontSize: '12px',
  lineHeight: '14px',
  margin: 0,
  padding: 0,
});

export const Success = styled('p')({
  position: 'absolute',
  top: 72,
  left: 10,

  color: 'green',
  fontSize: '12px',
  lineHeight: '14px',
  margin: 0,
  padding: 0,
});

export const ValidationIcon = styled('img')({
  position: 'absolute',
  top: 34,
  right: 20,
});

export const LogInBtn = styled('button')({
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

  ':hover': {
    background: '#4C85DA',
  },
  ':focus': {
    background: '#4C85DA',
  },
  '@media (min-width: 768px)': {
    fontSize: '16px',
    lineHeight: '19,2px',
    letterSpacing: '-0.36px',
  },
});

export const Separator = styled.hr`
  box-sizing: border-box;
  display: block;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dedede;
  width: 100%;
`;
