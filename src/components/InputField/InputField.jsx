import {
  InputFieldStyled,
  StyledLabel,
  StyledInput,
  ErrorStyled,
  SuccessStyled,
  PasswordReapetLable,
  EyeIcon,
} from '@/components/InputField/InputField.styled';
import { useState } from 'react';
import { TbEye, TbEyeClosed } from 'react-icons/tb';

const InputField = ({ props, formik }) => {
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
      <StyledLabel htmlFor={props.general} />
      <StyledInput
        autoComplete="off"
        id={props.general}
        name={props.general}
        type={
          showPassword && props.general === 'password' ? 'text' : props.type
        }
        onChange={formik.handleChange}
        value={formik.values[props.general]}
        placeholder={props.placeholder}
        $isErrorColor={formik.errors[props.general]}
        $isSuccessColor={formik.touched[props.general]}
      />
      {props.general === 'password' && (
        <EyeIcon onClick={togglePassword}>
          {showPassword ? <TbEyeClosed /> : <TbEye />}
        </EyeIcon>
      )}
      {renderValidationMessage()}
    </InputFieldStyled>
  );
};

export default InputField;
