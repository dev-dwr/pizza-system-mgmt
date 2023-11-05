"use client";
import { useContext, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { login, register } from "../utils/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import { User } from "../utils/types";
import { UIContext } from "../store/ui";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function Account() {
  const { push } = useRouter();
  const { login: saveUser } = useContext(UIContext);
  const [isLogin, setLogin] = useState(true);
  const {
    sendRequest: sendLogin,
    status: loginStatus,
    error: loginError,
    data,
    clear: clearLogin,
  } = useHttp(login);
  const {
    sendRequest: sendRegister,
    status: registerStatus,
    error: registerError,
    clear: clearRegister,
  } = useHttp(register);

  useEffect(() => {
    if (loginStatus === "success") {
      saveUser(data);
      clearLogin();
      enqueueSnackbar("Successfully logged in.", { variant: "success" });
      push("/");
    }
  }, [loginStatus, registerStatus, clearLogin, clearRegister]);

  useEffect(() => {
    if (registerStatus === "success") {
      clearRegister();
      enqueueSnackbar("Verification link sent to provided email.", {
        variant: "success",
      });
      setLogin(true);
    }
  }, [registerStatus, clearRegister]);

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
        register={!isLogin}
      />
      <Box minWidth={400}>
        {(loginStatus === "loading" || registerStatus === "loading") && (
          <LinearProgress />
        )}
      </Box>
      <Button onClick={() => setLogin((prev) => !prev)}>
        {isLogin ? "Create Account" : "Already have an account?"}
      </Button>
    </Stack>
  );
}
