import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth);

  const renderContent = () => {
    switch (isLoggedIn) {
      case null:
        return null;

      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );

      default:
        return [
          <li>
            <Payments />
          </li>,
          <li>
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={isLoggedIn ? "/surveys" : "/"} className="left brand-logo">
          SurveyApp
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

export default Header;
