import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchSurveys } from "../actions";

const SurveyList = () => {
  const surveys = useSelector(state => state.surveys);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const renderList = () => {
    return surveys.map((survey, index) => (
      <div className="card darken-1 blue-grey" key={index}>
        <div className="card-content white-text">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">
            Sent on: {new Date(survey.dateSent).toLocaleDateString()};
          </p>
        </div>

        <div className="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
        </div>
      </div>
    ));
  };

  return <div>{renderList()}</div>;
};

export default SurveyList;
