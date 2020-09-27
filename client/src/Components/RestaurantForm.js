import React, { useState } from "react";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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
    marginTop: theme.spacing(4),
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

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [restaurantId, setRestaurantId] = useState("");

  const [nameError, setNameError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [imageUrlError, setImageUrlError] = useState(false);
  const [restaurantIdError, setRestaurantIdError] = useState(false);

  let buttonName;
  let formTitle;
  let httpMethod;
  let url;

  if (props.landingPage === "addRestaurant") {
    buttonName = "Add Restaurant";
    formTitle = "Add New Restaurant to Database";
    httpMethod = "post";
    url = "api/v1/restaurants";
  } else if (props.landingPage === "updateRestaurant") {
    buttonName = "Update Restaurant";
    formTitle = "Update Restaurant Details";
    httpMethod = "patch";
    url = `api/v1/restaurants/${restaurantId}`;
  }

  // Submit Restaurant Form
  const submitRestaurantForm = async (event) => {
    event.preventDefault();

    if (name && city && imageUrl) {
      await axios({
        method: httpMethod,
        url,
        data: {
          name,
          city,
          rating,
          imageUrl,
        },
      }).then((res) => {
        props.setLandingPage("grid");
      });
    } else {
      if (!restaurantId) {
        setRestaurantIdError(true);
      }
      if (!name) {
        setNameError(true);
      }
      if (!city) {
        setCityError(true);
      }
      if (!imageUrl) {
        setImageUrlError(true);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <RestaurantMenuIcon fontSize="large" color="primary" />
        <Typography component="h1" variant="h5">
          {formTitle}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {props.landingPage === "updateRestaurant" && (
              <Grid item xs={12}>
                <TextField
                  autoComplete="restaurantId"
                  name="restaurantId"
                  variant="outlined"
                  required
                  fullWidth
                  id="restaurantId"
                  label="Restaurant ID"
                  autoFocus
                  error={restaurantIdError}
                  helperText={
                    restaurantIdError && "Restaurant ID cannot be empty"
                  }
                  onChange={(event) => {
                    setRestaurantIdError(false);
                    setRestaurantId(event.target.value);
                  }}
                  value={restaurantId}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Restaurant Name"
                autoFocus
                error={nameError}
                helperText={nameError && "Restaurant name cannot be empty"}
                onChange={(event) => {
                  setNameError(false);
                  setName(event.target.value);
                }}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                error={cityError}
                helperText={cityError && "City cannot be empty"}
                onChange={(event) => {
                  setCityError(false);
                  setCity(event.target.value);
                }}
                value={city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="rating"
                label="Rating"
                name="rating"
                autoComplete="rating"
                onChange={(event) => {
                  setRating(event.target.value);
                }}
                value={rating}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="imageUrl"
                label="Image Url"
                id="imageUrl"
                autoComplete="imageUrl"
                error={imageUrlError}
                helperText={imageUrlError && "Image Url cannot be empty"}
                onChange={(event) => {
                  setImageUrlError(false);
                  setImageUrl(event.target.value);
                }}
                value={imageUrl}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitRestaurantForm}
          >
            {buttonName}
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
