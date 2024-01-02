import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Pizza } from "../../utils/types";
import { useContext, useEffect } from "react";
import { capitalize } from "../../utils/utils";
import useHttp from "../../hooks/use-http";
import { decreasePizza, increasePizza } from "../../utils/api";
import { UIContext } from "../../store/ui";
import { enqueueSnackbar } from "notistack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  pizza: Pizza;
  refetch: () => void;
}

export default function Pizza({ pizza, refetch }: Props) {
  const { user } = useContext(UIContext);

  const {
    sendRequest: increase,
    status: increaseStatus,
    error: increaseError,
  } = useHttp(increasePizza);

  const {
    sendRequest: decrease,
    status: decreaseStatus,
    error: decreaseError,
  } = useHttp(decreasePizza);

  useEffect(() => {
    if (increaseStatus === "error")
      enqueueSnackbar(increaseError, { variant: "error" });
    else if (increaseStatus === "success") refetch();
  }, [increaseStatus]);

  useEffect(() => {
    if (decreaseStatus === "error")
      enqueueSnackbar(decreaseError, { variant: "error" });
    else if (decreaseStatus === "success") refetch();
  }, [decreaseStatus]);

  const handleIncrease = () => increase({ token: user?.token, pizza });
  const handleDecrease = () => decrease({ token: user?.token, pizza });

  return (
    <Card>
      <CardContent component={Stack} gap={1}>
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
          <Card
            component={Stack}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton onClick={handleDecrease}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">{pizza.quantity}</Typography>
            <IconButton onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}
