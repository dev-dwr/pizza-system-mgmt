"use client";
import { Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { UIContext } from "../store/ui";
import useHttp from "../hooks/use-http";
import { retrieveOrders } from "../utils/api";
import { useRouter } from "next/navigation";
import Order from "../components/Order";

export default function Orders() {
  const { user, employee } = useContext(UIContext);
  const { replace } = useRouter();
  const { sendRequest, status, error, data: orders } = useHttp(retrieveOrders);

  useEffect(() => {
    if (!user) replace("/login");
  }, [user]);

  useEffect(() => {
    if (user) sendRequest(employee ? undefined : user);
  }, [user]);

  useEffect(() => {
    if (status === "error") enqueueSnackbar(error, { variant: "error" });
  }, [status]);

  if (!orders) return <Typography>Loading...</Typography>;
  if (!orders.length) return <Typography>No orders yet.</Typography>;

  return (
    <Stack>
      <Typography>My Orders</Typography>
      {orders.map((pizza) => (
        <Order pizza={pizza} />
      ))}
    </Stack>
  );
}
