import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('sk_test_51QIvGEKKDaEXrAi5WZNgdQdTHEjZlGjHEeXarEEed8Q6pFVJJvh8TD4eOlfkb2eoXOJ8bi73514W5wHNh36QyhZx00itUxWnl3');

export default function DonationPage() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};