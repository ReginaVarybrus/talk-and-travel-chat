import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/Loader/Loader';
import { routesPath } from '@/routes/routesConfig';
import { getAvatar, getUser } from '@/redux-store/selectors';
import {
  getUsersAvatar,
  updateUser,
} from '@/redux-store/UserOperations/UserOperations';
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
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const AccountRoute = () => {
  // User details to display in Profile form are taken from Redux data.
  const user = useSelector(getUser);
  const avatar = useSelector(getAvatar);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleDeactivateStopmClient } = useWebSocket();

  const [editMode, setEditMode] = useState(false);
  // This {loading} is used to trigger display of <Loader/> while updateUser performig.
  const [loading, setLoading] = useState(false);
  const [avatarData, setavatarData] = useState(avatar);

  // it's a TEST of Avatar change
  const handleAvatarChange = event => {
    console.log('avatar');
    const file = event.target.files[0]; // Get the uploaded file
    console.log(file);
  };

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
  from typing any symbols above maximum length set in scheme  */
  const handleChange = e => {
    if (e.target.value.length <= ABOUT_MAX_CHAR_LIMIT) {
      formik.handleChange(e);
    }
  };
  /* on page render user data is selected from redux */
  useEffect(() => {
    formik.setValues(user);
    // setavatarData(dispatch(getUsersAvatar(user.id)));
    // console.log(avatarData);
  }, [user]);

  // Avatar fetch from server if exists
  useEffect(() => {
    if (!avatarData && avatar == null) {
      // Only fetch if avatarData is unset and avatar is null
      const fetchAvatar = async () => {
        try {
          const result = await dispatch(getUsersAvatar(user.id)).unwrap();
          setavatarData(result);
          console.log('Avatar data fetched:', result);
        } catch (error) {
          console.error('Failed to fetch avatar data:', error);
        }
      };
      fetchAvatar();
    }
  }, [avatarData, avatar]);

  const handleLogOut = async () => {
    try {
      handleDeactivateStopmClient();
      await dispatch(logOut());
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <ProfileStyled>
      <Header>
        <Title>Profile</Title>
      </Header>
      <ProfileContainer>
        <AvatarBlock>
          {avatarData ? (
            <Avatar src={avatarData} alt="User Avatar" />
          ) : (
            <p>Loading avatar...</p>
          )}

          {editMode && (
            <>
              <Input
                type="file"
                id="avatar-upload"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="avatar-upload">
                <Button
                  component="span"
                  sx={{ marginTop: '8px' }}
                  variant="text"
                >
                  Change photo
                </Button>
              </label>
            </>
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
