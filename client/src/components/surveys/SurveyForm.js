import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import { validateEmails } from "../../utils/validateEmails";
import { FIELDS } from "../../consts/formFields";

const SurveyForm = props => {
  const { handleSubmit } = props;

  const renderFields = () => {
    return FIELDS.map(({ name, label }) => (
      <Field
        type="text"
        label={label}
        name={name}
        component={SurveyField}
        key={name}
      />
    ));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(props.onSurveySubmit)}>
        {renderFields()}

        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>

        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  FIELDS.forEach(({ name }) => {
    if (!values[name]) errors[name] = `You must provide ${name}`;
  });

  return errors;
};

export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount: false,
  validate,
})(SurveyForm);
