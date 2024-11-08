import {AddressElement, CardElement, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <CardElement/>
      <AddressElement/>
      <button>Submit</button>
    </form>
  );
};
export default CheckoutForm;