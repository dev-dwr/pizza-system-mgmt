import { DEFAULT_PIZZA } from "./constants";
import { Pizza, Status, User } from "./types";

export async function login(user: User): Promise<string> {
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

  return data.token;
}

export async function logout(token: string): Promise<void> {
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

export async function register(user: User): Promise<void> {
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
}): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(pizza),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data.price;
}

export async function retrieveUserOrders(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/own`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
}
export async function retrieveOrders() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/all`
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
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
        Authorization: token,
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
        body: JSON.stringify({ ...DEFAULT_PIZZA, status }),
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}
