import { lazy, Suspense, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminLoginContext } from "./context/AdminLoginContext";
const BookingIndex = lazy(() => import("./core/private/booking"));
const CustomerForm = lazy(() => import("./core/private/customer/form"));
const CustomerIndex = lazy(() => import("./core/private/customer"));
const Home = lazy(() => import("./core/public/Home"));
const Login = lazy(() => import("./core/public/Login"));
const Register = lazy(() => import("./core/public/Register"));
const AdminPanel = lazy(() => import("./core/private/AdminPanel"));

function App() {
  const privateRoutes = [
    {
      path: "/admin",
      element: (
        <Suspense>
          <AdminPanel />
        </Suspense>
      ),
      errorElement: <>Error</>,
      children: [
        {
          path: "/admin/customer",
          element: (
            <Suspense>
              <CustomerIndex />
            </Suspense>
          ),
          errorElement: <>Error</>,
        },
        {
          path: "/admin/customer/form",
          element: (
            <Suspense>
              <CustomerForm />
            </Suspense>
          ),
          errorElement: <>Error</>,
        },
        ,
        {
          path: "/admin/booking",
          element: (
            <Suspense>
              <BookingIndex />
            </Suspense>
          ),
          errorElement: <>Error</>,
        },
      ],
    },
  ];

  const publicRoutes = [
    {
      path: "/",
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "/login",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "/register",
      element: (
        <Suspense>
          <Register />
        </Suspense>
      ),
    },

    { path: "*", element: <>unauthorized</> },
  ];

  const { isAdminLoggedIn } = useContext(AdminLoginContext);

  let routes = publicRoutes;
  if (isAdminLoggedIn) {
    routes = privateRoutes;
  }
  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
}

export default App;
