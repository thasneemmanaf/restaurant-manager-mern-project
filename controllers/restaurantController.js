const Restaurant = require("../models/restaurantModel");
const AppError = require("../utils/appError");

// Get all restaurants
exports.getAllRestaurants = async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.find();

    res.status(200).json({
      status: "sucess",
      data: {
        restaurants: allRestaurants,
      },
    });
  } catch {
    next(new AppError("Unable to fetch restaurants at the moment", 401));
  }
};

// Get restaurant based on id
exports.getRestaurantById = async (req, res, next) => {
  try {
    const newRestaurant = await Restaurant.findById(req.params.restaurantId);

    res.status(200).json({
      status: "sucess",
      data: {
        restaurant: newRestaurant,
      },
    });
  } catch {
    next(new AppError("Unable to fetch restaurant at the moment", 401));
  }
};

// Add restaurant
exports.addRestaurant = async (req, res, next) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        restaurant: newRestaurant,
      },
    });
  } catch {
    next(new AppError("Unable to add new restaurant", 401));
  }
};

// Update restaurant based on id
exports.updateRestaurant = async (req, res, next) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRestaurant) {
      return next(new AppError("Unable to update restaurant for this id", 401));
    }
    res.status(200).json({
      status: "sucess",
      data: {
        restaurant: updatedRestaurant,
      },
    });
  } catch {
    next(new AppError("Unable to update restaurant at the moment", 401));
  }
};

// Delete restaurant based on id
exports.deleteRestaurant = async (req, res, next) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(
      req.params.restaurantId
    );

    if (!deletedRestaurant) {
      return next(
        new AppError("This restaurant is not available to delete"),
        401
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        restaurant: deletedRestaurant,
      },
    });
  } catch {
    next(new AppError("Unable to delete the restaurant", 401));
  }
};
