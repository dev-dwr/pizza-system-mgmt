import { DEFAULT_PIZZA } from "./constants";
import { Pizza, Status, User } from "./types";
import { convertToPizzaDao } from "./utils";

export async function login(user: User) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data.token as string;
}

export async function logout(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function register(user: User) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/registration`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function sendOrder({
  token,
  pizza,
}: {
  token: string;
  pizza: Pizza;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(convertToPizzaDao(pizza)),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data.price as number;
}

export async function removeOrder({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/delete/${id}`,
    {
      headers: {
        method: "DELETE",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function changeOrderStatus({
  id,
  status,
}: {
  id: number;
  status: Status;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/${id}`,
    {
      headers: {
        method: "PUT",
        "Content-Type": "application/json",
        body: JSON.stringify(
          convertToPizzaDao({ ...DEFAULT_PIZZA, currentStatus: status })
        ),
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function getUserData(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data as User;
}

export async function retrieveOrders(token?: string) {
  if (!token) return retrieveAllOrders();
  return retrieveUserOrders(token);
}

async function retrieveUserOrders(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/own`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data as Pizza[];
}
async function retrieveAllOrders() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/all`
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data as Pizza[];
}
