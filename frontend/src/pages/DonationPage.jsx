import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe('pk_test_51QIvGEKKDaEXrAi5AG3E0OfoPf2BwVTlr3MOgsNa8cY1uagGcgRQiaEmjnA06YKMr17iH6X7LoKCDsMbP0RMepzs008M6rzP4C');

export default function DonationPage() {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Fetch the client secret from your server when the component mounts
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* include any necessary payment details here */ })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(error => console.error('Error fetching client secret:', error));
  }, []);

  const options = {
    clientSecret,
  };

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    )
  );
}
