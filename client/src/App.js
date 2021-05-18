import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchUser } from "./actions";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import SurveyNew from "./components/surveys/SurveyNew";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="container">
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Route component={Landing} path="/" exact />
            <Route component={SurveyNew} path="/surveys/new" />
            <Route component={Dashboard} path="/surveys" />
          </Switch>
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
