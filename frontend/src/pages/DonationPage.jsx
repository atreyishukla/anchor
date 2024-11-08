import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51QIvGEKKDaEXrAi5AG3E0OfoPf2BwVTlr3MOgsNa8cY1uagGcgRQiaEmjnA06YKMr17iH6X7LoKCDsMbP0RMepzs008M6rzP4C');

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