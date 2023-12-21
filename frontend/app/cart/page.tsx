"use client";
import { Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useLayoutEffect } from "react";
import { UIContext } from "../store/ui";
import useHttp from "../hooks/use-http";
import { retrieveOrders } from "../utils/api";
import { redirect } from "next/navigation";
import { Role } from "../utils/types";
import Orders from "../components/Orders/Orders";

export default function Cart() {
  const { user } = useContext(UIContext);
  const { sendRequest, status, error, data: orders } = useHttp(retrieveOrders);

  useEffect(() => {
    getOrders();
  }, [user]);

  useEffect(() => {
    if (status === "error") enqueueSnackbar(error, { variant: "error" });
  }, [status]);

  const getOrders = () => user && sendRequest(user.token);

  useLayoutEffect(() => {
    if (!user) redirect("/login");
    else if (user.userRole === Role.EMPLOYEE) redirect("/orders");
  }, []);

  return (
    <Stack gap={1}>
      <Typography variant="h3">My Order</Typography>
      <Orders orders={orders} refetch={getOrders} />
    </Stack>
  );
}
