import { useState } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = () => {
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  return (
    <div>
      {isReviewVisible ? (
        <SurveyFormReview onCancel={() => setIsReviewVisible(prev => !prev)} />
      ) : (
        <SurveyForm onSurveySubmit={() => setIsReviewVisible(true)} />
      )}
    </div>
  );
};

export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
