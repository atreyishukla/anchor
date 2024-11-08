// DonationPage.jsx
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load Stripe outside the component to avoid reloading it on every render
const stripePromise = loadStripe("pk_test_51QIvGEKKDaEXrAi5AG3E0OfoPf2BwVTlr3MOgsNa8cY1uagGcgRQiaEmjnA06YKMr17iH6X7LoKCDsMbP0RMepzs008M6rzP4C");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(1000); // Default amount in cents ($10.00)
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Create PaymentIntent on component mount
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => setError("Failed to initialize payment"));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Donor Name",
          },
        },
      });

      if (error) {
        setError(error.message);
        setSuccess("");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setSuccess("Donation successful!");
        setError("");
      }
    } catch (error) {
      setError("Payment failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary">Donate to Support</h2>

      <div>
        <label className="block text-sm font-medium">Amount (in USD):</label>
        <input
          type="number"
          value={amount / 100}
          onChange={(e) => setAmount(e.target.value * 100)}
          className="p-2 border rounded"
          min="1"
        />
      </div>

      <CardElement className="p-2 border rounded bg-white" />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary text-white p-2 rounded mt-4"
      >
        {loading ? "Processing..." : "Donate"}
      </button>

      {error && <div className="text-red-600 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </form>
  );
};

export default function DonationPage() {
  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-md mx-auto p-6 bg-accent rounded-lg shadow-lg">
        <CheckoutForm />
      </div>
    </Elements>
  );
}
