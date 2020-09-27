const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(restaurantController.getAllRestaurants)
  .post(authController.authenticateUser, restaurantController.addRestaurant);

router
  .route("/:restaurantId")
  .get(authController.authenticateUser, restaurantController.getRestaurantById)
  .patch(authController.authenticateUser, restaurantController.updateRestaurant)
  .delete(
    authController.authenticateUser,
    restaurantController.deleteRestaurant
  );

module.exports = router;
