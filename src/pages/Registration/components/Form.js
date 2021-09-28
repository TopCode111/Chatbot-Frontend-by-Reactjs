import React from "react";
import Button from "../../../components/Button";
import TextField from "../../../components/TextInput";
import Box from "@material-ui/core/Box";

export const Form = (props) => {
  const {
    values: { first_name, last_name, password, email },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    isLoading,
    setFieldValue,
  } = props;

  // const change = (e) => {
  //   e.persist();
  //   setFieldTouched(e.target.name, true, false);
  // };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "auto",  width: "90%"}}>
      <TextField
        name="last_name"
        helperText={touched.last_name ? errors.last_name : ""}
        error={touched.last_name && Boolean(errors.last_name)}
        label="性"
        value={last_name}
        onChange={handleChange}
      />
      <TextField
        name="first_name"
        helperText={touched.first_name ? errors.first_name : ""}
        error={touched.first_name && Boolean(errors.first_name)}
        label="名"
        value={first_name}
        onChange={handleChange}
      />
      
      <TextField
        name="email"
        helperText={touched.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
        label="メールアドレス"
        fullWidth
        value={email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        helperText={touched.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
        label="パスワード"
        fullWidth
        type="password"
        value={password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        // isLoading={isLoading}
        onChange={handleSubmit}
        title="登録"
        disabled={!isValid || isLoading}
      />
    </form>
  );
};
