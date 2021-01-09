import HomePageOut from "./components/HomePageOut";
import HomePageIn from "./components/HomePageIn";
import ProfileSettings from "./components/ProfileSettings";
import SearchPage from "./components/SearchPage";
import PetPage from "./components/PetPage";
import EditPet from "./components/EditPet";
import AdminPets from "./components/AdminPets";
import AdminDashboard from "./components/AdminDashboard";
import Admin from "./components/Admin";
import MyPetsPage from "./components/MyPetsPage";
import "./components/HomePage.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
          <Route path="/mypetspage">
            <MyPetsPage />
          </Route>
          <Route path="/in">
            <HomePageIn />
          </Route>
          <Route path="/admin/addpet">
            <AdminPets />
          </Route>
          <Route path="/admin/dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/pet/:id/edit">
            <EditPet />
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
