let logoutFn: () => void;

export const setLogout = (fn: () => void) => {
  logoutFn = fn;
};

export const logoutFromContext = () => {
  if (logoutFn) logoutFn();
};
