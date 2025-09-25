export interface User {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(user: User): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to register user");
  return res.json();
}

export async function loginUser(user: User): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
}