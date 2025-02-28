import { lazy, Suspense, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import { AdminLoginContext } from "./context/AdminLoginContext";
import ForgotPassword from "./core/public/ForgotPassword";
import MovieBooking from "./core/public/MovieBooking";
import MovieDescription from "./core/public/MovieDescription";
import ResetPassword from "./core/public/ResetPassword";
// Lazy Load Components
const BookingIndex = lazy(() => import("./core/private/booking"));
const CustomerForm = lazy(() => import("./core/private/customer/form"));
const CustomerIndex = lazy(() => import("./core/private/customer"));
const AdminBookings = lazy(() => import("./core/private/AdminBooking"));
const Home = lazy(() => import("./core/public/Home"));
const Login = lazy(() => import("./core/public/Login"));
const Register = lazy(() => import("./core/public/Register"));
const AdminPanel = lazy(() => import("./core/private/AdminPanel"));
const MovieTicket = lazy(() => import("./core/public/MovieTicket"));
const ShowTimeDetails = lazy(() => import("./core/public/ShowTimeDetails"));

// Import new pages
const BookingConfirmation = lazy(() =>
  import("./core/public/BookingConfirmation")
);
const PaymentPage = lazy(() => import("./core/public/Payment"));
const MyBookings = lazy(() => import("./core/public/MyBookings"));

function App() {
  const { isAdminLoggedIn } = useContext(AdminLoginContext); // Access the admin login state

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
        {
          path: "/admin/booking",
          element: (
            <Suspense>
              <BookingIndex />
            </Suspense>
          ),
          errorElement: <>Error</>,
        },
        {
          path: "/admin",
          element: (
            <Suspense>
              <AdminPanel />
            </Suspense>
          ),
          children: [
            { path: "/admin/bookings", element: <AdminBookings /> }, //  Add Route
          ],
        },
      ],
    },
    { path: "*", element: <>page not found</> },
  ];

  const publicRoutes = [
    {
      path: "/",
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
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
    {
      path: "/forgot-password",
      element: (
        <Suspense>
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: "/reset-password/:token",
      element: (
        <Suspense>
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: "/movie/:id",
      element: <MovieDescription />,
    },
    {
      path: "/movie-booking",
      element: <MovieBooking />,
    },
    {
      path: "/movie-booking/:movieId",
      element: <MovieBooking />,
    },
    {
      path: "/ticket/:bookingId",
      element: <MovieTicket />,
    },
    {
      path: "/movie",
      element: (
        <Suspense>
          <MovieCard />
        </Suspense>
      ),
      children: [
        {
          path: "/movie/:id",
          element: (
            <Suspense>
              <MovieDescription />
            </Suspense>
          ),
        },
      ],
    },

    //  Added new routes
    {
      path: "/booking-confirmation/:bookingId",
      element: (
        <Suspense>
          <BookingConfirmation />
        </Suspense>
      ),
    },
    {
      path: "/payment",
      element: (
        <Suspense>
          <PaymentPage />
        </Suspense>
      ),
    },
    {
      path: "/my-bookings",
      element: (
        <Suspense>
          <MyBookings />
        </Suspense>
      ),
    },
    {
      path: "/showtimes",
      element: (
        <Suspense>
          <ShowTimeDetails />
        </Suspense>
      ),
    },

    { path: "*", element: <>unauthorized</> },
  ];

  console.log(isAdminLoggedIn);

  // Conditionally use private routes or public routes
  const routes = isAdminLoggedIn ? privateRoutes : publicRoutes;

  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
