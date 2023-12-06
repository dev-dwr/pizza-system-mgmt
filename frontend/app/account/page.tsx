"use client";
import { useContext, useEffect } from "react";
import useHttp from "../hooks/use-http";
import { Button, Stack, Typography } from "@mui/material";
import { UIContext } from "../store/ui";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { logout } from "../utils/api";

export default function Account() {
  const { push, replace } = useRouter();
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

  if (!user) replace("/login");

  return (
    <Stack alignItems="left" gap={4}>
      <Typography variant="h5">
        <b>
          Name: {user?.firstname} {user?.lastname}
        </b>
      </Typography>
      <Typography variant="h6">Email: {user?.email}</Typography>
      <Button onClick={() => sendRequest(user?.token)} variant="contained">
        Logout
      </Button>
    </Stack>
  );
}
