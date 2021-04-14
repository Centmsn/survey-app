import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchUser } from "./actions";
import Header from "./components/Header";

const DashBoard = () => <h2>DashBoard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

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
            <Route component={DashBoard} path="/surveys" />
          </Switch>
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
