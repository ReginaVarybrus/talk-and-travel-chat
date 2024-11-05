import {
  InputFieldStyled,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  ErrorStyled,
  SuccessStyled,
  IconContainer,
  SuccessIcon,
  PopupPassword,
} from '@/components/InputField/InputFieldStyled';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TbEye, TbEyeClosed } from 'react-icons/tb';
import { routesPath } from '@/routes/routesConfig';

/* 
{disabled} variable is passed to determine whether input filed is asctive or not and 
implement the relavant styles. Because in Login and RegisterForm forms 
styles are different then in Profile.

{nolabel} variable is passed to render InputFieldStyled without visible lable

{props} passed here have interface like:
 {
    general: string,
    type: string,
    label: string,
    placeholder: string,
  }
  to pass the data rendered for each input field.

*/
const InputField = ({
  props,
  formik,
  disabled,
  nolabel,
  backgroundcolor,
  maxLength,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();
  const isRegisterPage = location.pathname === routesPath.REGISTER;
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    if (props.general === 'password' && isRegisterPage) {
      setIsPopupVisible(true);
    }
  };

  const handleBlur = () => {
    setIsPopupVisible(false);
  };

  const renderValidationMessage = () => {
    if (formik.errors[props.general]) {
      return (
        <ErrorStyled id={props.general}>
          {formik.errors[props.general]}
        </ErrorStyled>
      );
    }
    if (!formik.errors[props.general] && formik.touched[props.general]) {
      return (
        <SuccessStyled id={props.general}>
          <SuccessIcon />
        </SuccessStyled>
      );
    }
    return null;
  };

  return (
    <InputFieldStyled>
      {/* Render label conditionally based on nolabel */}
      {nolabel && (
        <StyledLabel disabled={disabled} htmlFor={props.general}>
          {props.label}
        </StyledLabel>
      )}
      {/* Conditionally render textarea or input basing on props.type */}
      {props.type === 'textarea' ? (
        <StyledTextarea
          id={props.general}
          name={props.general}
          type={props.type}
          disabled={disabled}
          onChange={onChange || formik.handleChange}
          value={formik.values[props.general] || ''}
          placeholder={props.placeholder}
          maxLength={maxLength}
          $isErrorColor={formik.errors[props.general]}
          $isSuccessColor={formik.touched[props.general]}
          $backgroundcolor={backgroundcolor}
        />
      ) : (
        <StyledInput
          autoComplete="off"
          id={props.general}
          name={props.general}
          type={
            showPassword &&
            (props.general === 'password' || props.general === 'repeatPassword')
              ? 'text'
              : props.type
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          onChange={formik.handleChange}
          value={formik.values[props.general] || ''}
          placeholder={props.placeholder}
          $isErrorColor={formik.errors[props.general]}
          $isSuccessColor={formik.touched[props.general]}
          $backgroundcolor={backgroundcolor}
        />
      )}
      {isPopupVisible && props.general === 'password' && isRegisterPage && (
        <PopupPassword>
          Your password must be 8+ characters, with at least 1 number
        </PopupPassword>
      )}
      {(props.general === 'password' || props.general === 'repeatPassword') && (
        <IconContainer onClick={togglePassword}>
          {showPassword ? <TbEyeClosed /> : <TbEye />}
        </IconContainer>
      )}
      {renderValidationMessage()}
    </InputFieldStyled>
  );
};

export default InputField;
