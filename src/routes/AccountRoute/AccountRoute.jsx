import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/Loader/Loader';
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
} from '@/routes/AccountRoute/AccountRouteStyled';

import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
import InputField from '@/components/InputField/InputField';

import {
  schema,
  formFields,
} from '@/routes/AccountRoute/AccountRouteValidationSchema';

const AccountRoute = () => {
  // User details to display in Profile form are taken from Redux data.
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  // This {loading} is used to trigger display of <Loader/> while updateUser performig.
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: user,
    validationSchema: schema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      // console.log('SUBMIT', values);
      setLoading(true);
      try {
        const resultAction = await dispatch(updateUser(values));
        // console.log('Result Action:', resultAction);
        if (updateUser.fulfilled.match(resultAction)) {
          // console.log('Update Successful:', resultAction.payload);
          navigate(routesPath.ACCOUNT);
          resetForm();
          // console.log('we are here wtf?');
          setEditMode(false);
        } else {
          // console.error('Update Failed:', resultAction.error);
        }
      } catch (error) {
        // console.error('Something went wrong:', error);
      } finally {
        setLoading(false); // Set loading to false after the async action
      }
    },
  });

  // This const is to toggle the Profile form from view to edit.
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const cancelEdit = () => {
    formik.setValues(user);
    setEditMode(false);
  };

  useEffect(() => {
    console.log('Render', user);
    formik.setValues(user);
  }, [user]);

  console.log(formik.initialValues.about);

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
            <form onSubmit={formik.handleSubmit} autoComplete="off">
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
              <InputField
                key={user.about}
                props={formFields.about}
                formik={formik}
                disabled={!editMode}
                nolabel="false"
                backgroundcolor="var(--color-white)"
              />
              {editMode && (
                <>
                  <BasicButton
                    sx={{ marginRight: '16px' }}
                    variant="outlined"
                    text="Cancel"
                    handleClick={cancelEdit}
                  />
                  <BasicButton
                    sx={{ marginRight: '16px' }}
                    handleClick={formik.handleSubmit}
                    type="submit"
                    text="Update"
                    variant="contained"
                  />
                </>
              )}
            </form>
          )}
        </InputBlock>
        <EditButton
          onClick={editMode ? cancelEdit : toggleEditMode}
          $icon={editMode ? 'close' : 'edit'}
        />
      </ProfileContainer>
    </ProfileStyled>
  );
};

export default AccountRoute;
