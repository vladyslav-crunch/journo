// utils/secureFetch.ts
import { logoutFromContext } from "./logoutHelper"; // You implement this

export const secureFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const res = await fetch(input, init);

  if (res.status === 401) {
    logoutFromContext();
    throw new Error("Unauthorized");
  }

  return res;
};
