import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pizza } from "../../utils/types";
import { useContext, useEffect } from "react";
import { capitalize } from "../../utils/utils";
import useHttp from "../../hooks/use-http";
import { removePizza } from "../../utils/api";
import { UIContext } from "../../store/ui";
import { enqueueSnackbar } from "notistack";

interface Props {
  pizza: Pizza;
  refetch: () => void;
}

export default function Pizza({ pizza, refetch }: Props) {
  const { user } = useContext(UIContext);

  const {
    sendRequest: remove,
    status: removeStatus,
    error: removeError,
  } = useHttp(removePizza);

  useEffect(() => {
    if (removeStatus === "error")
      enqueueSnackbar(removeError, { variant: "error" });
    else if (removeStatus === "success") refetch();
  }, [removeStatus]);

  const handleRemove = () => remove({ token: user?.token, id: pizza.id });

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
          <IconButton onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
