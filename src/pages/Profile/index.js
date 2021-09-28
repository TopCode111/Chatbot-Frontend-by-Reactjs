import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router";
import { Form } from "./components/Form";
import { ChangePassword } from "./components/ChangePasswordForm";
import Box from "@material-ui/core/Box";
import Card from "./components/Card";
import * as Yup from "yup";
import useStyles from "./styles";
import {
  useUpdateUser,
  useUpdateProfilePicture,
  useChangePassword,
} from "../../hooks/users/useUsers";
import LocalStorageService from "../../utils/localStorageService";
const localStorageService = LocalStorageService.getService();

const validationSchema = Yup.object({
  first_name: Yup.string("Enter your first name").required("Required"),
  last_name: Yup.string("Enter your last name").required("Required"),
  email: Yup.string("Enter your email")
    .email("正しく入力されているか確認してください。")
    .required("入力してください。"),
});

const passwordFormValidationSchema = Yup.object({
  old_password: Yup.string("")
    .min(4, "Password must contain at least 4 characters")
    .required("入力してください。"),
  new_password: Yup.string("")
    .min(4, "Password must contain at least 4 characters")
    .required("入力してください。"),
  new_password_confirmation: Yup.string("")
    .min(4, "Password must contain at least 4 characters")
    .required("入力してください。"),
});

const EditProfile = () => {
  const history = useHistory();
  const currentUser = localStorageService.getCurrentUser();
  const [currentProfile, setCurrentProfile] = useState({});
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: uploadProfilePicture } = useUpdateProfilePicture();
  const { mutate: updatePassword } = useChangePassword();

  console.log("currentUser", currentUser);
  console.log(currentUser.profile.avatar);
  useEffect(() => {
    setCurrentProfile(currentUser.profile);
    setUpdatedValues({
      ...currentUser.profile,
      avatar: {
        avatar: currentUser.profile.avatar ? currentUser.profile.avatar : '', 
      },
    });
  }, []);

  const submit = (data) => {
    updateUser(data);
  };

  const uploadImage = () => {
    formvalue?.avatar?.e && uploadProfilePicture(formvalue.avatar.e);
  };
  const changePassword = (data) => {
    updatePassword(data);
  };

  const classes = useStyles();
  const values = {
    last_name: currentUser?.last_name,
    first_name: currentUser?.first_name,
    email: currentUser?.email,
  };
  const passwordFormValues = {
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  };

  const [formvalue, setUpdatedValues] = useState({});

  console.log("formValue", formvalue);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className="profile-panel">
        <Box>
          <Box mb={2}>
            <Formik
              render={(props) => (
                <Form
                  {...props}
                  isLoading={false}
                  avatar={formvalue?.avatar}
                  handleAvatar={(avatar) =>
                    setUpdatedValues({ ...currentProfile, avatar: avatar })
                  }
                  setValues={setUpdatedValues}
                  uploadImage={uploadImage}
                />
              )}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={submit}
              enableReinitialize={true}
            />
          </Box>
          
          <Formik
            render={(props) => <ChangePassword {...props} isLoading={false} />}
            initialValues={passwordFormValues}
            validationSchema={passwordFormValidationSchema}
            onSubmit={changePassword}
          />
        </Box>
        </div>        
      </div>
    </div>
  );
};

export default EditProfile;
