const API_URL = "/api/auth";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const validateToken = async (token: string) => {
  const res = await fetch(`${API_URL}/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) throw new Error("Unauthorized");

  return res.json();
};
