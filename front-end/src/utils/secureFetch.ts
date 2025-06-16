import { logoutFromContext } from "./logoutHelper";

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
