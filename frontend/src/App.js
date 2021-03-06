import React, { useState, useCallback } from "react";
import "./App.css";

// UI Components
import Navbar from "./components/Shared/Navbar/Navbar";
import SideDrawer from "./components/Shared/SideDrawer/SideDrawer";


// Page Components
import WelcomePage from "./pages/Welcome/Welcome";
import Authentication from "./pages/Users/Authentication";
import CardsPage from "./pages/CreditCards/CardManage";
import OverviewPage from "./pages/Overview/Overview";
import EditUserPage from "./pages/Users/EditUser"
import AddCardPage from "./pages/CreditCards/AddCard";
import EditCardPage from "./pages/CreditCards/EditCard";
import DeleteCardPage from "./pages/CreditCards/DeleteCard";
import LogoutPage from "./pages/Users/LogoutPage";
import { Authenticate } from "./authContext";


import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_id, setUser_Id] = useState(false);
  const [card_id, setCard_Id] = useState(false);

  const login = useCallback((uid) => {
    setLoggedIn(true);
    setUser_Id(uid);
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    setUser_Id(null);
  }, []);

  const grabCardID = useCallback((cid) => {
    setCard_Id(cid);
  }, []);

  // UI states
  const [drawerToggled, setDrawerToggled] = useState(false);

  const toggleDrawerHandler = () => {
    setDrawerToggled(drawerToggled => !drawerToggled);
  };

  const closeDrawerHandler = () => {
    setDrawerToggled(false);
  };

  let route;

  if (loggedIn) {
    route = (
      <Switch>
        <Route exact path="/" component={OverviewPage} />
        <Route path="/cards" component={CardsPage} />
        <Route path="/addCards" component={AddCardPage} />
        <Route path="/editCards" component={EditCardPage} />
        <Route path="/deleteCards" component={DeleteCardPage} />
        <Route path="/editUser" component={EditUserPage} />
        <Route path="/logout" component={LogoutPage} />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/authentication" component={Authentication} />
      </Switch>
    );
  }

  return (
    <Authenticate.Provider
      value={{
        loggedIn: loggedIn,
        user_id: user_id,
        login: login,
        logout: logout,
        card_id: card_id,
        grabCard: grabCardID
      }}
    >
      <Router>
        {/* only used for the sidedrawer mainly */}
        <div style={{ height: "100%" }}>
          <Navbar drawerClick={toggleDrawerHandler} />
          <SideDrawer showDrawer={drawerToggled} closed={closeDrawerHandler} />
          <main>{route}</main>
        </div>
      </Router>
    </Authenticate.Provider>
  );
}

export default App;
