"use client";
import { Typography, TextField, Button, Box } from "@mui/material";
import useForm from "../hooks/use-form";
import { Role, User } from "../utils/types";
import { useState } from "react";

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return passwordRegex.test(password);
}

const validateConfirm = (confirm: string, password: string): boolean =>
  confirm === password;

const validateName = (name: string): boolean => /^[a-zA-Z]+$/.test(name);

interface Props {
  title: string;
  onSubmit: (value: User) => void;
  register?: boolean;
}

export default function RegisterForm({ title, onSubmit, register }: Props) {
  const [submit, setSubmit] = useState(false);

  const {
    value: firstname,
    onChange: nameChange,
    onBlur: nameBlur,
    valid: nameValid,
    touched: nameTouched,
  } = useForm(validateName);

  const {
    value: lastname,
    onChange: lastNameChange,
    onBlur: lastNameBlur,
    valid: lastNameValid,
    touched: lastNameTouched,
  } = useForm(validateName);

  const {
    value: email,
    onChange: emailChange,
    onBlur: emailBlur,
    valid: emailValid,
    touched: emailTouched,
  } = useForm(validateEmail);

  const {
    value: password,
    onChange: passwordChange,
    onBlur: passwordBlur,
    valid: passwordValid,
    touched: passwordTouched,
  } = useForm(validatePassword);

  const {
    value: confirm,
    onChange: confirmChange,
    onBlur: confirmBlur,
    valid: confirmValid,
    dirty: confirmDirty,
  } = useForm((confirm) => validateConfirm(confirm, password || ""));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmit(true);

    if (register && (!nameValid || !lastNameValid || !confirmValid)) return;
    if (!emailValid || !passwordValid) return;

    onSubmit({
      firstname,
      lastname,
      email,
      password,
      userRole: Role.USER,
      token: "",
    });
  };

  const isError = (touched: boolean, valid: boolean) =>
    (submit || touched) && !valid;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        {register && (
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstname}
            onChange={nameChange}
            onBlur={nameBlur}
            helperText={
              isError(nameTouched, nameValid)
                ? "This is not valid first name"
                : ""
            }
            error={isError(nameTouched, nameValid)}
          />
        )}
        {register && (
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastname}
            onChange={lastNameChange}
            onBlur={lastNameBlur}
            helperText={
              isError(lastNameTouched, lastNameValid)
                ? "This is not valid last name."
                : ""
            }
            error={isError(lastNameTouched, lastNameValid)}
          />
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={emailChange}
          onBlur={emailBlur}
          helperText={
            isError(emailTouched, emailValid) ? "This is not valid e-mail." : ""
          }
          error={isError(emailTouched, emailValid)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={passwordChange}
          onBlur={passwordBlur}
          helperText={
            isError(passwordTouched, passwordValid)
              ? "At least 8 characters long, contains uppercase letter and number."
              : ""
          }
          error={isError(passwordTouched, passwordValid)}
        />
        {register && (
          <TextField
            label="Confirm password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={confirm}
            onChange={confirmChange}
            onBlur={confirmBlur}
            helperText={
              isError(confirmDirty, confirmValid) ? "Passwords must match" : ""
            }
            error={isError(confirmDirty, confirmValid)}
          />
        )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {title}
        </Button>
      </form>
    </Box>
  );
}
