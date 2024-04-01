import {
  ItemWrapp,
  StyledLabel,
  StyledInput,
  Error,
  Success,
  PasswordReapetLable,
} from '@/components/InputField/InputField.styled';

const InputField = ({ props, formik }) => {
  const renderValidationMessage = elem => {
    const label =
      elem.general === 'password'
        ? 'Your password must be 8+ characters, with at least 1 number and 1 special symbol'
        : '';
    if (formik.errors[props.general]) {
      return <Error id={props.general}>{formik.errors[props.general]}</Error>;
    }
    if (!formik.errors[props.general] && formik.touched[props.general]) {
      return <Success id={props.general}>Field is not empty</Success>;
    }
    return <PasswordReapetLable>{label}</PasswordReapetLable>;
  };

  return (
    <ItemWrapp>
      <StyledLabel
        color={{
          error: formik.errors[props.general],
          touched: formik.touched[props.general],
        }}
        htmlFor="email"
      />
      <StyledInput
        autoComplete="off"
        id={props.general}
        name={props.general}
        type={props.type}
        onChange={formik.handleChange}
        value={formik.values[props.general]}
        placeholder={props.placeholder}
        color={{
          error: formik.errors[props.general],
          touched: formik.touched[props.general],
        }}
      />

      {renderValidationMessage(props)}
    </ItemWrapp>
  );
};

export default InputField;
