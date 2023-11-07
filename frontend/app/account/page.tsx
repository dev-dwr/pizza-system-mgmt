"use client";
import { useContext, useEffect } from "react";
import useHttp from "../hooks/use-http";
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
import { logout } from "../utils/api";

export default function Account() {
  const { push } = useRouter();
  const { user, logout: deleteUser } = useContext(UIContext);
  const { sendRequest, status, error } = useHttp(logout);

  useEffect(() => {
    if (status === "error") {
      enqueueSnackbar(error, { variant: "error" });
    } else if (status === "success") {
      deleteUser();
      enqueueSnackbar("Successfully logged out.", { variant: "success" });
      push("/");
    }
  }, [status]);

  return (
    <Stack alignItems="center">
      <Button onClick={() => sendRequest(user)} variant="contained">
        Logout
      </Button>
    </Stack>
  );
}
