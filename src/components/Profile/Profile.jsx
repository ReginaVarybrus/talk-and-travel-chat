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
  AvatarBlock,
  Avatar,
  InputBlock,
  EditButton,
} from '@/components/Profile/ProfileStyled';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
import InputField from '@/components/InputField/InputField';
import {
  formFields,
  schema,
} from '@/components/Profile/ProfileValidationSchema';

/* initialValues are used to render all input fields of Profile form 
indicated in formFields imported from a ProfileValidationSchema
*/
const initialValues = {};
Object.keys(formFields).forEach(key => {
  initialValues[key] = '';
});

const Profile = () => {
  // User details to display in Profile form are taken from Redux data.
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  // This const is to toggle the Profile form from view to edit.
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const cancelEdit = () => {
    setEditMode(false);
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
    console.log(user);
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
        <AvatarBlock>
          <Avatar />
          {editMode ? (
            <BasicButton
              sx={{ marginTop: '8px' }}
              variant="transparent"
              text="Change photo"
            />
          ) : (
            ''
          )}
        </AvatarBlock>
        <InputBlock>
          {Object.entries(formFields).map(([key, value]) => (
            <InputField
              key={key}
              props={value}
              formik={formik}
              name={value.general}
              disabled={!editMode}
              backgroundColor="var(--color-white)"
            />
          ))}
          {editMode ? (
            <BasicButton
              sx={{ marginRight: '16px' }}
              variant="outlined"
              text="Cancel"
              handleClick={cancelEdit}
            />
          ) : (
            ''
          )}
          {editMode ? (
            <BasicButton
              sx={{ marginRight: '16px' }}
              text="Update"
              variant="contained"
            />
          ) : (
            ''
          )}{' '}
        </InputBlock>
        <EditButton
          onClick={toggleEditMode}
          $icon={editMode ? 'close' : 'edit'}
        />
      </ProfileContainer>
    </ProfileStyled>
  );
};

export default Profile;
