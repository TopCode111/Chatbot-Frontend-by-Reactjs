import React from "react";
import Button from "../../../components/Button";
import TextField from "../../../components/TextInput";
import Box from "@material-ui/core/Box";
import AvatarUploader from "../../../components/AvatarUplaoder";
import ReactFlagsSelect from "react-flags-select";
import LocalStorageService from "../../../utils/localStorageService";
const localStorageService = LocalStorageService.getService();

export const Form = (props) => {
  const {
    values: { last_name, first_name, email },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    isLoading,
    setFieldValue,
    avatar,
    setValues,
    handleAvatar,
    uploadImage,
  } = props;

  const change = (e) => {
    handleChange(e);
    setValues({
      last_name,
      first_name,
      email,
      avatar: avatar,
    });
  };

  const handleCountry = (name, code) => {
    setFieldValue(name, code);
    setValues({
      last_name,
      first_name,
      email,
      avatar: avatar,
    });
  };
  const token = localStorageService.getAccessToken();

  console.log("avatar", avatar);

  return (
    <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
      <Box
        m={2}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <AvatarUploader value={avatar?.avatar} onChange={handleAvatar} />
        {/* <AvatarUploader onChange={handleAvatar}>
          <img src="`url(${avatar?.avatar})`" />
          <div style={{backgroundImage: '${avatar?.avatar}'}}>
          </div>
        </AvatarUploader> */}
        <Box>
          <Button
            onChange={uploadImage}
            title="画像保管"
            disabled={!isValid || isLoading}
            size="small"
            variant="outlined"
          />
        </Box>
      </Box>

      <TextField
        name="last_name"
        helperText={touched.last_name ? errors.last_name : ""}
        error={touched.last_name && Boolean(errors.last_name)}
        label="性"
        value={last_name}
        onChange={change}
      />
      <TextField
        name="first_name"
        helperText={touched.first_name ? errors.first_name : ""}
        error={touched.first_name && Boolean(errors.first_name)}
        label="名"
        value={first_name}
        onChange={change}
      />      
      <TextField
        name="email"
        helperText={touched.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
        label="メールアドレス"
        value={email}
        onChange={change}
      />
      <div className="profile-update">
        <Button
          type="submit"
          isLoading={isLoading}
          onChange={handleSubmit}
          title="プロフィール更新"
          disabled={!isValid || isLoading}
          style={{ width: '200px', }}
        />
      </div>
    </form>
  );
};
