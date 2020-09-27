import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      SC Eats
      {" " + new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    // marginTop: -30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [FnameError, setFnameError] = useState(false);
  const [LnameError, setLnameError] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);

  // Submit Sign Up Form
  const submitSignUpForm = async (event) => {
    event.preventDefault();

    if (firstName && lastName && email && password) {
      await axios({
        method: "post",
        url: "api/v1/users/signup",
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      })
        .then((res) => {
          props.setSignedIn(true);
          props.setErrorMessage("");
          props.setLandingPage("grid");
        })
        .catch((error) => {
          props.setSignedIn(false);
          props.setErrorMessage(
            "Unable to register at the moment! Please try again after some time"
          );
          console.log(error);
        });
    } else {
      if (!firstName) {
        setFnameError(true);
      }
      if (!lastName) {
        setLnameError(true);
      }
      if (!email) {
        setEmailError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={FnameError}
                helperText={FnameError && "First name cannot be empty"}
                onChange={(event) => {
                  setFnameError(false);
                  setFirstName(event.target.value);
                }}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={LnameError}
                helperText={LnameError && "Last name cannot be empty"}
                onChange={(event) => {
                  setLnameError(false);
                  setLastName(event.target.value);
                }}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                error={EmailError}
                helperText={EmailError && "Email cannot be empty"}
                onChange={(event) => {
                  setEmailError(false);
                  setEmail(event.target.value);
                }}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={PasswordError}
                helperText={PasswordError && "Password cannot be empty"}
                onChange={(event) => {
                  setPasswordError(false);
                  setPassword(event.target.value);
                }}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitSignUpForm}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                onClick={() => props.setLandingPage("signin")}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
