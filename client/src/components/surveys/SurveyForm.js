import { Field, reduxForm } from "redux-form";

const SurveyForm = props => {
  const { handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit(values => console.log(values))}>
        <Field type="text" name="surveyTitle" component="input" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "surveyForm",
})(SurveyForm);
