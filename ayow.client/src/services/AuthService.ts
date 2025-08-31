
import type { LoginDTO } from "../types/LoginDTO";
import type { User } from "../types/User";

export async function login(credentials: LoginDTO) {
  const response = await fetch("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials),
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