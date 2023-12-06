"use client";
import { Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { UIContext } from "../store/ui";
import useHttp from "../hooks/use-http";
import { retrieveOrders } from "../utils/api";
import { useRouter } from "next/navigation";
import OrderList from "../components/Orders/Orders";
import { Role } from "../utils/types";

export default function Orders() {
  const { user } = useContext(UIContext);
  const { replace } = useRouter();
  const { sendRequest, status, error, data: orders } = useHttp(retrieveOrders);

  useEffect(() => {
    getOrders();
  }, [user]);

  useEffect(() => {
    if (status === "error") enqueueSnackbar(error, { variant: "error" });
  }, [status]);

  const getOrders = () =>
    user &&
    sendRequest(user.userRole === Role.EMPLOYEE ? undefined : user.token);

  if (!user) replace("/login");

  return (
    <Stack gap={1}>
      <Typography variant="h3">
        {user?.userRole === Role.USER ? "My" : ""} Orders
      </Typography>
      <OrderList orders={orders} refetch={getOrders} />
    </Stack>
  );
}
