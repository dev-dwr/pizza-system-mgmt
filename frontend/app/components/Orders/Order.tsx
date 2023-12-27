import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Delivery, Order, Role, Status } from "../../utils/types";
import Select from "../../UI/Select";
import { useContext, useEffect, useState } from "react";
import {
  getDeliveries,
  getDelivery,
  getStatus,
  getStatuses,
} from "../../utils/utils";
import useHttp from "../../hooks/use-http";
import { changeOrderDelivery, changeOrderStatus } from "../../utils/api";
import { UIContext } from "../../store/ui";
import { enqueueSnackbar } from "notistack";
import Pizza from "./Pizza";

function getStatusDesc(status: Status) {
  switch (status) {
    case Status.INIT:
      return "We received Your order and are preparing it.";
    case Status.START:
      return "We started preparing the order.";
    case Status.FINISH:
      return "The order has been finished.";
  }
}

interface Props {
  order: Order;
  refetch: () => void;
}

export default function Order({ order, refetch }: Props) {
  const { user } = useContext(UIContext);
  const [status, setStatus] = useState(order.currentStatus || Status.INIT);
  const [delivery, setDelivery] = useState(
    order.delivery || Delivery.ON_PIZZA_PLACE
  );
  const {
    sendRequest: sendChangeStatus,
    status: changeStatus,
    error: changeError,
  } = useHttp(changeOrderStatus);

  const {
    sendRequest: sendChangeDelivery,
    status: deliveryStatus,
    error: deliveryError,
  } = useHttp(changeOrderDelivery);

  useEffect(() => {
    if (changeStatus === "error")
      enqueueSnackbar(changeError, { variant: "error" });
    else if (changeStatus === "success") refetch();
  }, [changeStatus]);

  useEffect(() => {
    if (deliveryStatus === "error")
      enqueueSnackbar(deliveryError, { variant: "error" });
    else if (deliveryStatus === "success") refetch();
  }, [deliveryStatus]);

  const handleStatusChange = () => sendChangeStatus({ id: order?.id, status });
  const handleDeliveryChange = () =>
    sendChangeDelivery({ token: user?.token, delivery });

  if (!order.pizzas.length) return null;

  return (
    <Card>
      <CardContent component={Stack} gap={1}>
        {order.currentStatus && (
          <Card sx={{ bgcolor: "rgba(0, 255, 0, 0.1)" }}>
            <CardContent>
              <Typography>
                <b>Status of Your Order:</b>
              </Typography>
              <Typography>{getStatusDesc(order.currentStatus)}</Typography>
            </CardContent>
          </Card>
        )}
        {order.pizzas.map((p) => (
          <Pizza pizza={p} refetch={refetch} />
        ))}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>
            Price: <b>{order.price}zł</b>
          </Typography>
          {user?.userRole === Role.USER && (
            <Stack direction="row" gap={1} alignItems="center">
              <Select
                sx={{ minWidth: 160, mt: 1 }}
                label="Delivery"
                value={delivery}
                onValueChange={(value) => setDelivery(getDelivery(value))}
                items={getDeliveries()}
              />
              <Button variant="contained" onClick={handleDeliveryChange}>
                Change
              </Button>
            </Stack>
          )}
          {user?.userRole === Role.EMPLOYEE && (
            <Stack direction="row" gap={1} alignItems="center">
              <Select
                sx={{ minWidth: 120, mt: 1 }}
                label="Status"
                value={status}
                onValueChange={(value) => setStatus(getStatus(value))}
                items={getStatuses()}
              />
              <Button variant="contained" onClick={handleStatusChange}>
                Change
              </Button>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
