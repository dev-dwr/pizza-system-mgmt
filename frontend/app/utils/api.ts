import { User } from "./types";

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
