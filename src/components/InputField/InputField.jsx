import {
  ItemWrapp,
  StyledLabel,
  StyledInput,
  Error,
  Success,
} from '@/components/InputField/InputField.styled';

const InputField = ({ props, formik }) => {
  const renderValidationMessage = () => {
    if (formik.errors[props.general]) {
      return <Error>{formik.errors[props.general]}</Error>;
    }
    if (!formik.errors[props.general] && formik.touched[props.general]) {
      return <Success>Field is not empty</Success>;
    }
    return null;
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

      {renderValidationMessage()}
    </ItemWrapp>
  );
};

export default InputField;
