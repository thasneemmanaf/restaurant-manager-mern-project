import React, { useEffect, useState } from "react";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Grid from "./Components/Grid";
import Appbar from "./Components/Appbar";
import Box from "@material-ui/core/Box";
import Loader from "./Components/Loader/Loader";
import RestaurantForm from "./Components/RestaurantForm";
import Alert from "./Components/Alert";
import axios from "axios";

function App() {
  const [landingPage, setLandingPage] = useState("grid");
  const [isSignedIn, setSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");

  // Get user from DB based on Token when App is refreshed
  useEffect(() => {
    axios({
      method: "get",
      url: "api/v1/users/login",
    })
      .then((res) => {
        setUserName(res.data.data.user.firstName);
        setSignedIn(true);
        setErrorMessage("");
        setLandingPage("grid");
      })
      .catch((error) => {
        setUserName("");
        setSignedIn(false);
        setErrorMessage("");
        setLandingPage("grid");
      });
  }, []);

  let output = <Grid />;
  if (landingPage === "grid") {
    output = <Grid />;
  } else if (landingPage === "signup") {
    output = (
      <SignUp
        setSignedIn={setSignedIn}
        setErrorMessage={setErrorMessage}
        setLandingPage={setLandingPage}
      />
    );
  } else if (landingPage === "signin") {
    output = (
      <SignIn
        setSignedIn={setSignedIn}
        setErrorMessage={setErrorMessage}
        setLandingPage={setLandingPage}
      />
    );
  } else if (landingPage === "loader") {
    output = <Loader />;
  } else if (
    landingPage === "addRestaurant" ||
    landingPage === "updateRestaurant"
  ) {
    output = (
      <RestaurantForm
        setLandingPage={setLandingPage}
        landingPage={landingPage}
      />
    );
  }

  return (
    <div className="App">
      <Appbar
        setLandingPage={setLandingPage}
        isSignedIn={isSignedIn}
        setSignedIn={setSignedIn}
        setErrorMessage={setErrorMessage}
        setUserName={setUserName}
        userName={userName}
      />
      {errorMessage && <Alert>{errorMessage}</Alert>}
      <Box m={8}>{output}</Box>
    </div>
  );
}

export default App;
