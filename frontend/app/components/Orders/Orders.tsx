import { Order as IOrder } from "@/app/utils/types";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Order from "../Orders/Order";

interface Props {
  orders?: IOrder[];
  refetch: () => void;
}

export default function Orders({ orders, refetch }: Props) {
  if (!orders)
    return (
      <Box width="100%">
        <LinearProgress />
      </Box>
    );

  const filteredOrders = orders.filter((o) => o.pizzas.length > 0);
  if (!filteredOrders.length) return <Typography>No orders yet.</Typography>;

  return (
    <Stack gap={1}>
      {filteredOrders.map((order) => (
        <Order key={order.id} order={order} refetch={refetch} />
      ))}
    </Stack>
  );
}
