import {
  InputFieldStyled,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  ErrorStyled,
  SuccessStyled,
  PasswordReapetLable,
  IconContainer,
} from '@/components/InputField/InputFieldStyled';
import { useState } from 'react';
import { TbEye, TbEyeClosed } from 'react-icons/tb';

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
const InputField = ({ props, formik, disabled, nolabel, backgroundcolor }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const renderValidationMessage = () => {
    const label =
      props.general === 'password'
        ? 'your password must be 8+ characters, with at least 1 number and 1 special symbol'
        : '';
    if (formik.errors[props.general]) {
      return (
        <ErrorStyled id={props.general}>
          {formik.errors[props.general]}
        </ErrorStyled>
      );
    }
    if (!formik.errors[props.general] && formik.touched[props.general]) {
      return (
        <SuccessStyled id={props.general}>field is not empty</SuccessStyled>
      );
    }
    return <PasswordReapetLable>{label}</PasswordReapetLable>;
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
          minRow={2}
          id={props.general}
          name={props.general}
          type={props.type}
          disabled={disabled}
          onChange={formik.handleChange}
          value={formik.values[props.general] || ''}
          placeholder={props.placeholder}
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
          disabled={disabled}
          onChange={formik.handleChange}
          value={formik.values[props.general] || ''}
          placeholder={props.placeholder}
          $isErrorColor={formik.errors[props.general]}
          $isSuccessColor={formik.touched[props.general]}
          $backgroundcolor={backgroundcolor}
        />
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
