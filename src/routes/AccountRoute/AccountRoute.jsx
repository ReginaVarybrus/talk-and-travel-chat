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
  ChangePhotoBox,
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
  const [formChanged, setformChanged] = useState(false);
  // This {loading} is used to trigger display of <Loader/> while updateUser performig.
  const [loading, setLoading] = useState(false);
  // this avatarPreview is used to render Avatar when user tries to upload a new image.
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarBlob, setavatarBlob] = useState(null);
  const [cacheBuster, setCacheBuster] = useState(Date.now());

  // delete the exif data from file before sending it to server:
  function EXIFdelete(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          // Convert the canvas image to a Blob without EXIF metadata
          canvas.toBlob(
            blob => {
              if (blob) {
                // Convert the Blob into a File object
                const fileWithMetadata = new File([blob], 'avatar.jpg', {
                  type: file.type, // Preserve the original file type
                  lastModified: Date.now(), // Set the last modification date
                });
                resolve(fileWithMetadata); // Resolve with the cleaned file
              } else {
                reject(new Error('Failed to create blob.'));
              }
            },
            file.type, // Use the original file type
            1.0 // Quality (1.0 for full quality)
          );
        };
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsDataURL(file);
    });
  }

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
          const cleanedFile = await EXIFdelete(avatarBlob);
          const [avatarUpdateResult, userResult] = await Promise.all([
            dispatch(updateUsersAvatar(cleanedFile)),
            dispatch(updateUser(values)),
          ]);
          if (updateUsersAvatar.fulfilled.match(avatarUpdateResult)) {
            setCacheBuster(Date.now()); // Update cacheBuster on successful avatar update
          }
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
          setAvatarPreview(null);
          setavatarBlob(null);
          setEditMode(false);
          setformChanged(false);
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
    formik.resetForm({ values: user });
    setAvatarPreview(null);
    setformChanged(false);
    setEditMode(false);
  };

  // handleAvatarChange catches the file picked by user
  const handleAvatarChange = event => {
    // Validation of file selected by user by size and by type:
    const file = event.target.files[0];
    if (file) {
      // Check the file type (e.g., allow only images)
      if (!file.type.startsWith('image/')) {
        formik.setErrors({
          ...formik.errors,
          avatar: 'Only image files are allowed.',
        });
        setAvatarPreview(null);
        setformChanged(false);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        formik.setErrors({
          ...formik.errors,
          avatar: 'Please select a file under 2MB.',
        });
        setAvatarPreview(null);
        setformChanged(false);
        return;
      }
      formik.setErrors({ ...formik.errors, avatar: '' }); // Clear any previous avatar errors
      setavatarBlob(file); // save file for further metadata change before submit
      console.log(avatarBlob);
      // Set preview URL for the selected image
      setAvatarPreview(URL.createObjectURL(file));
      setformChanged(true);
      // Reset the input value to allow reselecting the same file
      event.target.value = null;
    } else {
      console.error('No file selected');
    }
  };

  /* On-fligth validation of ABOUT field to prevent user
  from typing any symbols above maximum length set in scheme  */
  const handleChange = e => {
    if (e.target.value.length <= ABOUT_MAX_CHAR_LIMIT) {
      formik.handleChange(e);
    }
  };

  const handleInputChange = () => {
    setformChanged(true);
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
              `${user.avatar?.image256x256}?cache=${cacheBuster}`
            }
            alt="User Avatar"
          />
          {editMode && (
            <>
              <input
                id="file-upload"
                type="file"
                aria-label="Upload your avatar"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <ChangePhotoBox>
                <TextButton htmlFor="file-upload" text="Change photo" />
                {formik.errors.avatar && (
                  <p style={{ color: 'red' }}>{formik.errors.avatar}</p>
                )}
              </ChangePhotoBox>
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
                onChange={handleInputChange}
                disabled={!editMode}
                nolabel="false"
                backgroundcolor="var(--color-white)"
              />
              <InputField
                key={user.userEmail}
                props={formFields.userEmail}
                formik={formik}
                onChange={handleInputChange}
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
                  onChange={(handleChange, handleInputChange)}
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
                    type="button"
                    text="Cancel"
                    handleClick={cancelEdit}
                  />
                  {formChanged && (
                    <MediumFilledButton
                      handleClick={formik.handleSubmit}
                      type="submit"
                      text="Update"
                    />
                  )}
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
