import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const BookingIndex = lazy(() => import("./core/private/booking"));
const CustomerForm = lazy(() => import("./core/private/customer/form"));
const CustomerIndex = lazy(() => import("./core/private/customer"));
const Home = lazy(() => import("./core/public/Home"));
const Login = lazy(() => import("./core/public/Login"));
const Register = lazy(() => import("./core/public/Register"));
const Layout = lazy(() => import("./core/private/Layout"));

function App() {
  const privateRoutes = [
    {
      path: "/admin",
      element: (
        <Suspense>
          <Layout />
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

  // logic TODO
  const isAuthenticated = true;

  const routes = isAuthenticated ? privateRoutes : publicRoutes;
  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
}

export default App;
