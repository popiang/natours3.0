const express = require("express");
const tourController = require("./../controller/tourController");

const router = express.Router();

// router.param("id", tourController.checkID);

router
    .route("/top5cheap")
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route("/")
    .get(tourController.getAllTours)
    .post(tourController.createTour);
router
    .route("/:id")
    .get(tourController.getTourById)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
