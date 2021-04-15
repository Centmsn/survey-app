import StripeCheckout from "react-stripe-checkout";

const Payments = () => {
  return (
    <StripeCheckout
      amount={500}
      token={token => console.log(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      name="SurveyApp"
      description="5$ for 5 email credits"
    />
  );
};

export default Payments;
