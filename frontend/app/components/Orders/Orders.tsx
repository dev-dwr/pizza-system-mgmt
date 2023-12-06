import { Pizza } from "@/app/utils/types";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Order from "./Order";

interface Props {
  orders?: Pizza[];
}

export default function Orders({ orders }: Props) {
  if (!orders)
    return (
      <Box width="100%">
        <LinearProgress />
      </Box>
    );
  if (!orders.length) return <Typography>No orders yet.</Typography>;

  return (
    <Stack gap={1}>
      {orders.map((pizza) => (
        <Order key={pizza.id} pizza={pizza} />
      ))}
    </Stack>
  );
}
