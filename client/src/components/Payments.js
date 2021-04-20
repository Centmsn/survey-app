import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { handleToken } from "../actions/index";

const Payments = () => {
  const dispatch = useDispatch();

  return (
    <StripeCheckout
      amount={500}
      token={token => dispatch(handleToken(token))}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      name="SurveyApp"
      description="5$ for 5 email credits"
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default Payments;
