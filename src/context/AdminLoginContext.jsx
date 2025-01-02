import { createContext, useState } from "react";

export const AdminLoginContext = createContext();

export function AdminLoginProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <>
      <AdminLoginContext.Provider
        value={{ isAdminLoggedIn, setIsAdminLoggedIn }}
      >
        {children}
      </AdminLoginContext.Provider>
    </>
  );
}
