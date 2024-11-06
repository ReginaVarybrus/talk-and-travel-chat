import styled from 'styled-components';
import backgroundImage from '@/images/bg-png.png';

export const RegisterFormBackground = styled.section`
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
  text-align: center;
  @media (max-width: 767px) {
    max-width: 500px;
    margin: 24px 36px;
  }
  @media (min-width: 768px) {
    max-width: 600px;
    background: var(--color-grey-4);
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

export const SignInFormStyles = styled.form`
  position: relative;
  @media (min-width: 768px) {
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
  line-height: 19px;

  @media (max-width: 767px) {
    margin-bottom: 32px;
  }

  @media (min-width: 768px) {
    margin-bottom: 48px;
  }
`;

export const LoginLink = styled.a`
  color: var(--color-brand-blue);
  cursor: pointer;
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

export const TextForgotPassword = styled.p`
  position: absolute;
  bottom: 260px;
  right: 125px;
  color: var(--color-brand-blue);
  font-size: 12px;
`;
