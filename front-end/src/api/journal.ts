import type {
  JournalEntryCreate,
  JournalEntryUpdate,
} from "../types/JournalEntry";
import { secureFetch } from "../utils/secureFetch";
const API_URL = "/api/journals";

export const fetchEntries = async (token: string) => {
  const res = await secureFetch(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const fetchEntry = async (token: string, id: string) => {
  const res = await secureFetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch entry");
  }

  return res.json();
};

export const createEntry = async (token: string, entry: JournalEntryCreate) => {
  const res = await secureFetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create entry");
  }

  return res.json();
};

export const updateEntry = async (
  token: string,
  id: string,
  entry: JournalEntryUpdate
) => {
  const res = await secureFetch(`${API_URL}/${id}`, {
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
  await secureFetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
