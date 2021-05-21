import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { FIELDS } from "../../consts/formFields";
import { submitSurvey } from "../../actions/index";

const SurveyReviewComponent = ({ onCancel }) => {
  const formValues = useSelector(state => state.form.surveyForm.values);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(history);

  const renderFormFields = () =>
    FIELDS.map(({ name, label }) => (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ));

  const handleSubmit = () => {
    dispatch(submitSurvey(formValues, history));
  };

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>{renderFormFields()}</div>
      <button
        className="yellow  btn-flat white-text darken-3"
        onClick={onCancel}
      >
        Back
      </button>

      <button
        className="btn-flat green right white-text"
        onClick={handleSubmit}
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default SurveyReviewComponent;
