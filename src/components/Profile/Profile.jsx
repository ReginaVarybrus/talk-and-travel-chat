import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routesPath } from '@/routes/routesConfig';
import { getUser } from '@/redux-store/selectors';
import { updateUser } from '@/redux-store/UserOperations/UserOperations';

import {
  ProfileStyled,
  Header,
  Title,
  ProfileContainer,
  Avatar,
  InputBlock,
  EditButton,
} from '@/components/Profile/ProfileStyled';
import InputField from '@/components/InputField/InputField';
import {
  formFields,
  schema,
} from '@/components/Profile/ProfileValidationSchema';

const initialValues = {};
Object.keys(formFields).forEach(key => {
  initialValues[key] = '';
});

const Profile = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      dispatch(updateUser(values));
      navigate(routesPath.ACCOUNT);
      resetForm();
      setEditMode(false);
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues(user);
    }
  }, [user]);

  return (
    <ProfileStyled>
      <Header>
        <Title>Profile</Title>
      </Header>
      <ProfileContainer>
        <Avatar />
        <InputBlock>
          {Object.entries(formFields).map(([key, value]) => (
            <InputField
              key={key}
              props={value}
              formik={formik}
              name={value.general}
              disabled={!editMode}
            />
          ))}
        </InputBlock>
        <EditButton
          type="button"
          onClick={toggleEditMode}
          $icon={editMode ? 'close' : 'edit'}
        />
      </ProfileContainer>
    </ProfileStyled>
  );
};

export default Profile;
