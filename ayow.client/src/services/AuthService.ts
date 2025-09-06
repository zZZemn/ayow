
import type { LoginDTO } from "../types/LoginDTO";
import type { RegisterDTO } from "../types/RegisterDTO";
import type { User } from "../types/User";

export async function login(payload: LoginDTO) {
  const response = await fetch("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }

  return response.json() as Promise<{
    message: string;
    auth: { token: string; user: User }
  }>;
}

export async function register(payload: RegisterDTO) {
  const response = await fetch("auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Register failed");
  }

  return response.json() as Promise<{
    message: string;
    auth: { token: string; user: User };
  }>;
}