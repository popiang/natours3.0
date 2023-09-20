const fs = require("fs");
const Tour = require("../models/tourModel");

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-sample.json`)
// );

// exports.checkID = (req, res, next, val) => {
//     if (isNaN(val * 1) || val < 0 || val * 1 > tours.length) {
//         return res.status(400).json({
//             status: "Fail",
//             message: "Invalid ID",
//         });
//     }

//     next();
// };

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: "Fail",
//             message: "Tour name and price are required!!",
//         });
//     }

//     next();
// };

exports.getAllTours = (req, res, next) => {
    // res.status(200).json({
    //     status: "success",
    //     count: tours.length,
    //     requestedAt: req.requestTime,
    //     data: {
    //         tours,
    //     },
    // });
};

exports.createTour = async (req, res, next) => {
    try {
		console.log("masuk create tour");
        const newTour = await Tour.create(req.body);
		console.log(newTour);

        res.status(201).json({
            status: "success",
            data: {
                tour: newTour,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.getTourById = (req, res, next) => {
    const id = req.params.id * 1;
    // const tour = tours.find((tour) => (tour.id = id));

    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
};

exports.updateTour = (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "not implemented yet!",
    });
};

exports.deleteTour = (req, res, next) => {
    res.status(204).json({
        status: "success",
        message: "not implemented yet!",
    });
};
