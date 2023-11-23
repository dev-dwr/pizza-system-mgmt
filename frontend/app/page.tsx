"use client";
import { Stack, Typography } from "@mui/material";
import PizzaForm from "./components/PizzaForm";
import { DEFAULT_PIZZA } from "./utils/constants";
import useHttp from "./hooks/use-http";
import { sendOrder } from "./utils/api";
import { useContext, useEffect } from "react";
import { UIContext } from "./store/ui";
import { enqueueSnackbar } from "notistack";
import { Pizza } from "./utils/types";

export default function Home() {
  const { user: token } = useContext(UIContext);
  const {
    sendRequest: addPizza,
    status,
    error
  } = useHttp(sendOrder);

  useEffect(() => {
    if (status === "error") enqueueSnackbar(error, { variant: "error" });
    else if (status === "success")
      enqueueSnackbar("Pizza ordered :D", {
        variant: "success",
      });
  }, [status]);

  const handleAdd = (pizza: Pizza) => {
    addPizza({ token, pizza });
  };

  return (
    <Stack>
      {!token && (
        <Typography>
          Welcome to Pizza. Log in to order OUR best pizzas!
        </Typography>
      )}
      {token && <PizzaForm pizza={DEFAULT_PIZZA} onAdd={handleAdd} />}
    </Stack>
  );
}
