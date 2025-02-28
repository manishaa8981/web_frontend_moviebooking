import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ bookingId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios.post("http://localhost:4011/api/payment/create-payment-intent", {
      bookingId,
      amount,
    }).then((res) => {
      setClientSecret(res.data.clientSecret);
    }).catch((error) => {
      console.error("Error fetching payment intent:", error);
    });
  }, [bookingId, amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      console.error("Payment Error:", error);
    } else if (paymentIntent.status === "succeeded") {
      await axios.post("http://localhost:4011/api/payment/confirm-payment", {
        paymentIntentId: paymentIntent.id,
      });
      alert("Payment Successful!");
      navigate(`/booking-confirmation/${bookingId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg text-white">
      <h2 className="text-lg font-bold mb-4">Enter Payment Details</h2>
      <CardElement className="bg-gray-700 p-4 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
      >
        Pay ₹{amount}
      </button>
    </form>
  );
};

export default PaymentForm;
