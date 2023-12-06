"use client";
import { Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { UIContext } from "../store/ui";
import useHttp from "../hooks/use-http";
import { retrieveOrders } from "../utils/api";
import { useRouter } from "next/navigation";
import OrderList from "../components/Orders/Orders";

export default function Orders() {
  const { user, employee } = useContext(UIContext);
  const { replace } = useRouter();
  const { sendRequest, status, error, data: orders } = useHttp(retrieveOrders);

  useEffect(() => {
    if (user) sendRequest(employee ? undefined : user);
  }, [user]);

  useEffect(() => {
    if (status === "error") enqueueSnackbar(error, { variant: "error" });
  }, [status]);

  if (!user) replace("/login");

  return (
    <Stack gap={1}>
      <Typography variant="h3">My Orders</Typography>
      <OrderList orders={orders} />
    </Stack>
  );
}
