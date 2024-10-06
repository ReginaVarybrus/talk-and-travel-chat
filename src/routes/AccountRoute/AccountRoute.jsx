import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/Loader/Loader';
import { routesPath } from '@/routes/routesConfig';
import { getUser } from '@/redux-store/selectors';
import { updateUser } from '@/redux-store/UserOperations/UserOperations';
import { useWebSocket } from '@/hooks/useWebSocket.js';

import {
  ProfileStyled,
  Header,
  Title,
  ProfileContainer,
  AvatarBlock,
  Avatar,
  InputBlock,
  ProfileForm,
  TextAbout,
  EditPencilIcon,
  CloseIcon,
  EditButton,
  ChoiceButtonBlock,
  LogoutButton,
  LogoutIcon,
} from '@/routes/AccountRoute/AccountRouteStyled';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
import InputField from '@/components/InputField/InputField';
import {
  StyledLabel,
  InputFieldStyled,
} from '@/components/InputField/InputFieldStyled';

import {
  ABOUT_MAX_CHAR_LIMIT,
  schema,
  formFields,
} from '@/routes/AccountRoute/AccountRouteValidationSchema';
import { logOut } from '@/redux-store/AuthOperations/AuthOperations';

const AccountRoute = () => {
  // User details to display in Profile form are taken from Redux data.
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleDeactivateStopmClient } = useWebSocket();

  const [editMode, setEditMode] = useState(false);
  // This {loading} is used to trigger display of <Loader/> while updateUser performig.
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: user,
    validationSchema: schema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const resultAction = await dispatch(updateUser(values));
        if (updateUser.fulfilled.match(resultAction)) {
          navigate(routesPath.ACCOUNT);
          resetForm();
          setEditMode(false);
        } else {
          console.error('Update Failed:', resultAction.error);
        }
      } catch (error) {
        console.error('Something went wrong:', error);
      } finally {
        setLoading(false); // Set loading to false after the async action
      }
    },
  });

  // This const is to toggle the Profile form from view to edit.
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  /* This const is to toggle the Profile form from edit to view 
  mode and restore the form values. */
  const cancelEdit = () => {
    formik.setValues(user);
    setEditMode(false);
  };

  /* On-fligth validation of ABOUT field to prevent user
  from typing any symbols above maximum lenght set in scheme  */
  const handleChange = e => {
    //  remove: console.log(`about field text has ${e.target.value.length} symbols`);
    if (e.target.value.length <= ABOUT_MAX_CHAR_LIMIT) {
      formik.handleChange(e);
    }
  };

  useEffect(() => {
    formik.setValues(user);
  }, [user]);

  const handleLogOut = () => {
    dispatch(logOut())
      .then(() => {
        navigate(routesPath.MAIN);
      })
      .catch(error => {
        console.error('Logout failed:', error.message);
      });
    handleDeactivateStopmClient();
  };

  return (
    <ProfileStyled>
      <Header>
        <Title>Profile</Title>
      </Header>
      <ProfileContainer>
        <AvatarBlock>
          <Avatar />
          {editMode && (
            <BasicButton
              sx={{ marginTop: '8px' }}
              variant="transparent"
              text="Change photo"
            />
          )}
        </AvatarBlock>
        <InputBlock>
          {loading ? (
            <Loader />
          ) : (
            <ProfileForm onSubmit={formik.handleSubmit} autoComplete="off">
              <InputField
                key={user.userName}
                props={formFields.userName}
                formik={formik}
                disabled={!editMode}
                nolabel="false"
                backgroundcolor="var(--color-white)"
              />
              <InputField
                key={user.userEmail}
                props={formFields.userEmail}
                formik={formik}
                disabled={!editMode}
                nolabel="false"
                backgroundcolor="var(--color-white)"
              />
              {editMode ? (
                <InputField
                  key={user.about}
                  props={formFields.about}
                  formik={formik}
                  disabled={!editMode}
                  nolabel="false"
                  backgroundcolor="var(--color-white)"
                  onChange={handleChange}
                  maxLength={ABOUT_MAX_CHAR_LIMIT}
                />
              ) : (
                <InputFieldStyled>
                  <StyledLabel htmlFor="about">About</StyledLabel>
                  <TextAbout name="about">{formik.values.about}</TextAbout>
                </InputFieldStyled>
              )}
              {editMode && (
                <ChoiceButtonBlock>
                  <BasicButton
                    sx={{ margin: '0' }}
                    variant="outlined"
                    text="Cancel"
                    handleClick={cancelEdit}
                  />
                  <BasicButton
                    sx={{ margin: '0' }}
                    handleClick={formik.handleSubmit}
                    type="submit"
                    text="Update"
                    variant="contained"
                  />
                </ChoiceButtonBlock>
              )}
            </ProfileForm>
          )}
        </InputBlock>
        <EditButton onClick={editMode ? cancelEdit : toggleEditMode}>
          {editMode ? <CloseIcon /> : <EditPencilIcon />}
        </EditButton>
      </ProfileContainer>
      {!editMode && (
        <LogoutButton onClick={handleLogOut}>
          <LogoutIcon />
          Log out
        </LogoutButton>
      )}
    </ProfileStyled>
  );
};

export default AccountRoute;
