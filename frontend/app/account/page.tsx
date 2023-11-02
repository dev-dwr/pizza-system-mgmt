"use client";

import { useState } from "react";
import useHttp from "../hooks/use-http";
import { login, register } from "../utils/api";
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import { User } from "../utils/types";

export default function Account() {
  const [isLogin, setLogin] = useState(true);
  const {
    sendRequest: sendLogin,
    status: loginStatus,
    error: loginError,
    clear: clearLogin,
  } = useHttp(login);
  const {
    sendRequest: sendRegister,
    status: registerStatus,
    error: registerError,
    clear: clearRegister,
  } = useHttp(register);

  const handleSubmit = (user: User) => {
    if (isLogin) {
      clearRegister();
      sendLogin(user);
    } else {
      clearLogin();
      sendRegister(user);
    }
  };

  return (
    <Stack alignItems="center" gap={1}>
      <Card
        sx={{
          minWidth: 400,
          visibility: loginError || registerError ? "visible" : "hidden",
        }}
      >
        <CardContent component={Stack} alignItems="center">
          <Typography color="error">{loginError || registerError}</Typography>
        </CardContent>
      </Card>
      <RegisterForm
        title={isLogin ? "Login" : "Register"}
        onSubmit={handleSubmit}
      />
      <Box minWidth={400}>
        {(loginStatus === "loading" || registerStatus === "loading") && (
          <LinearProgress />
        )}
      </Box>
    </Stack>
  );
}
