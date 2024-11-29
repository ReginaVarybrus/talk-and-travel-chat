import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/Loader/Loader';
import { routesPath } from '@/routes/routesConfig';
import { getUser } from '@/redux-store/selectors';
import {
  updateUser,
  updateUsersAvatar,
} from '@/redux-store/user/userOperations';
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
import { logOut } from '@/redux-store/auth/authOperations';
import TextButton from '@/components/Buttons/TextButton/TextButton';
import MediumOutlinedButton from '@/components/Buttons/MediumOutlined/MediumOutlinedButton';
import MediumFilledButton from '@/components/Buttons/MediumFilledButton/MediumFilledButton';

const AccountRoute = () => {
  // User details to display in Profile form are taken from Redux data.
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleDeactivateStopmClient } = useWebSocket();
  const [editMode, setEditMode] = useState(false);
  // This {loading} is used to trigger display of <Loader/> while updateUser performig.
  const [loading, setLoading] = useState(false);
  // this avatarPreview is used to render Avatar when user tries to upload a new image.
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarBlob, setavatarBlob] = useState(null);
  // handleAvatarChange catches the file picked by user
  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        console.error('File is too large. Please select a file under 2MB.');
        return;
      }
      // Check the file type (e.g., allow only images)
      if (!file.type.startsWith('image/')) {
        console.error('Only image files are allowed.');
        return;
      }
      setavatarBlob(file);
      // Set preview URL for the selected image
      setAvatarPreview(URL.createObjectURL(file));
      // Reset the input value to allow reselecting the same file
      event.target.value = null;
    } else {
      console.error('No file selected');
    }
  };

  const formik = useFormik({
    initialValues: user,
    validationSchema: schema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        let userUpdateResult;
        if (avatarPreview) {
          const [avatarUpdateResult, userResult] = await Promise.all([
            dispatch(updateUsersAvatar(avatarBlob)),
            dispatch(updateUser(values)),
          ]);
          if (!updateUsersAvatar.fulfilled.match(avatarUpdateResult)) {
            console.error('Avatar Update Failed:', avatarUpdateResult.error);
            return;
          }
          userUpdateResult = userResult;
        } else {
          userUpdateResult = await dispatch(updateUser(values));
        }
        if (updateUser.fulfilled.match(userUpdateResult)) {
          navigate(routesPath.ACCOUNT);
          resetForm();
          setEditMode(false);
        } else {
          console.error('Update Failed:', userUpdateResult.error);
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
    formik.setErrors({});
    setAvatarPreview(null);
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
  }, [user]);
  /* when logout button pressed logout is performed */
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
          <Avatar
            src={
              avatarPreview ||
              `${user.avatar?.image256x256}?lastmod=${new Date().getTime()}`
            }
            alt="User Avatar"
          />
          {editMode && (
            <>
              <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <TextButton htmlFor="file-upload" text="Change photo" />
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
                  <MediumOutlinedButton
                    style={{ margin: '0' }}
                    text="Cancel"
                    handleClick={cancelEdit}
                  />
                  <MediumFilledButton
                    style={{ margin: '0' }}
                    handleClick={formik.handleSubmit}
                    type="submit"
                    text="Update"
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
