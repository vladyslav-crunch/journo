import type {
  JournalEntryCreate,
  JournalEntryUpdate,
} from "../types/JournalEntry";

const API_URL = "/api";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/auth/login`, {
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
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchEntries = async (token: string) => {
  const res = await fetch(`${API_URL}/journals`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const createEntry = async (token: string, entry: JournalEntryCreate) => {
  const res = await fetch(`${API_URL}/journals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  });
  return res.json();
};

export const updateEntry = async (
  token: string,
  id: string,
  entry: JournalEntryUpdate
) => {
  const res = await fetch(`${API_URL}/journals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  });
  return res.json();
};

export const deleteEntry = async (token: string, id: string) => {
  await fetch(`${API_URL}/journals/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// api/auth.ts
export const validateToken = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) throw new Error("Unauthorized");

  return res.json(); // e.g., return user info
};
