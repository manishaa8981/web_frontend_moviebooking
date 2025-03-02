import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe Public Key from Backend
const stripePromise = fetch("http://localhost:4011/api/payment/public-key")
  .then((res) => res.json())
  .then((data) => loadStripe(data.publicKey));

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
