import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreatePin from "./components/CreatePinPage";
import AllPins from "./components/AllPins";
import UpdatePin from "./components/UpdatePinPage";
import PinDetails from "./components/PinDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/pins/new">
            <CreatePin />
          </Route>
          <Route path="/pins/:pinId/update">
            <UpdatePin />
          </Route>
          <Route path="/pins/:pinId">
            <PinDetails />
          </Route>
          <Route exact path='/'>
           <AllPins />
         </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
