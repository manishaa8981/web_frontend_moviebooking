// import { createContext, useState } from "react";

// export const AdminLoginContext = createContext();

// export function AdminLoginProvider({ children }) {
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

//   return (
//     <>
//       <AdminLoginContext.Provider
//         value={{ isAdminLoggedIn, setIsAdminLoggedIn }}
//       >
//         {children}
//       </AdminLoginContext.Provider>
//     </>
//   );
// }

import { createContext, useEffect, useState } from "react";

export const AdminLoginContext = createContext();

export function AdminLoginProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the role in localStorage is "admin"
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdminLoggedIn(true);
    }
  }, []); // Runs only once when the component mounts

  return (
    <AdminLoginContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </AdminLoginContext.Provider>
  );
}
