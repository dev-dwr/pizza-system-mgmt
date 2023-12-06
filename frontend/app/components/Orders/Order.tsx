import {
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pizza, Role, Status } from "../../utils/types";
import Select from "../../UI/Select";
import { useContext, useEffect, useState } from "react";
import { capitalize, getStatus, getStatuses } from "../../utils/utils";
import useHttp from "../../hooks/use-http";
import { changeOrderStatus, removeOrder } from "../../utils/api";
import { UIContext } from "../../store/ui";
import { enqueueSnackbar } from "notistack";

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
  pizza: Pizza;
}

export default function Order({ pizza }: Props) {
  const { user } = useContext(UIContext);
  const [status, setStatus] = useState(pizza.currentStatus || Status.INIT);
  const {
    sendRequest: change,
    status: changeStatus,
    error: changeError,
  } = useHttp(changeOrderStatus);
  const {
    sendRequest: remove,
    status: removeStatus,
    error: removeError,
  } = useHttp(removeOrder);

  useEffect(() => {
    if (changeStatus === "error")
      enqueueSnackbar(changeError, { variant: "error" });
  }, [status]);

  useEffect(() => {
    if (removeStatus === "error")
      enqueueSnackbar(removeError, { variant: "error" });
  }, [status]);

  const handleRemove = () => remove({ token: user?.token, id: pizza.id });
  const handleChange = () => change({ id: pizza.id, status });

  return (
    <Card>
      <CardContent component={Stack} gap={1}>
        {pizza.currentStatus && (
          <Card sx={{bgcolor: "rgba(0, 255, 0, 0.1)"}}>
            <CardContent>
              <Typography>
                <b>Status of Your Order:</b>
              </Typography>
              <Typography>{getStatusDesc(pizza.currentStatus)}</Typography>
            </CardContent>
          </Card>
        )}
        <Typography variant="h6">
          {capitalize(pizza.size)} {pizza.dough} pizza with {pizza.sauce} sauce
        </Typography>
        {!!pizza.ingredientsList.length && (
          <Stack>
            <Typography>Ingredients</Typography>
            {pizza.ingredientsList.map((ingredient) => (
              <Typography key={ingredient} variant="body2" ml={1}>
                • {ingredient}
              </Typography>
            ))}
          </Stack>
        )}
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>
            Price: <b>{pizza.price}zł</b>
          </Typography>
          {user?.userRole === Role.EMPLOYEE && (
            <Stack direction="row" gap={1} alignItems="center">
              <Select
                sx={{ minWidth: 120, mt: 1 }}
                label="Status"
                value={status}
                onValueChange={(value) => setStatus(getStatus(value))}
                items={getStatuses()}
              />
              <Button variant="contained" onClick={handleChange}>
                Change
              </Button>
            </Stack>
          )}
          <IconButton onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
