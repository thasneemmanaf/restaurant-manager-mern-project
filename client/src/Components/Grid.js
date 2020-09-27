import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function NestedGrid() {
  const classes = useStyles();

  const [restaurants, setRestaurants] = useState([]);

  // Get all restaurants from DB
  useEffect(() => {
    async function getAllRestaurants() {
      await axios({
        method: "get",
        url: "api/v1/restaurants",
      })
        .then((res) => {
          setRestaurants(res.data.data.restaurants);
        })
        .catch((error) => console.log(error));
    }
    getAllRestaurants();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          {restaurants.map((restaurant) => {
            return (
              <Grid key={restaurant._id} item xs={4}>
                <RestaurantCard
                  name={restaurant.name}
                  city={restaurant.city}
                  rating={restaurant.rating}
                  imageUrl={restaurant.imageUrl}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
