import HomePageOut from "./components/HomePageOut";
import HomePageIn from "./components/HomePageIn";
import ProfileSettings from "./components/ProfileSettings";
import SearchPage from "./components/SearchPage";
import PetPage from "./components/PetPage";
import Admin from "./components/Admin";
import "./components/HomePage.css";
import logo from "./components/logo.jpg";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/searchpage">
            <SearchPage />
          </Route>
          <Route path="/profilesettings">
            <ProfileSettings />
          </Route>
          <Route path="/in">
            <HomePageIn />
          </Route>
          <Route path="/admin/addpet">
            <Admin />
          </Route>
          <Route path="/admin/dashboard">
            <h1> Admin Dashboard</h1>
          </Route>
          <Route path="/admin">
            <div className="homePage">
              <nav>
                <ul className="navbar">
                  <li className="navLi">
                    <Link to="/admin/addpet">Add Pet Form</Link>
                  </li>
                  <li className="navLi">
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                </ul>
              </nav>
              <h1 className="welcomeUser">Admin Pages</h1>
              <img src={logo} alt="logo" className="logo" />
            </div>
          </Route>
          <Route path="/pet/:id">
            <PetPage />
          </Route>
          <Route path="/">
            <HomePageOut />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
