const fs = require("fs");

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-sample.json`)
);

exports.checkID = (req, res, next, val) => {
    if (isNaN(val * 1) || val < 0 || val * 1 > tours.length) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid ID",
        });
    }

    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: "Fail",
            message: "Tour name and price are required!!",
        });
    }

    next();
};

exports.getAllTours = (req, res, next) => {
    res.status(200).json({
        status: "success",
        count: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours,
        },
    });
};

exports.createTour = (req, res, next) => {
    console.log(req.body);

    const id = tours[tours.length - 1].id + 1;
    const newTour = { id: id, ...req.body };
    console.log(newTour);
    tours.push(newTour);

    fs.writeFileSync(
        `${__dirname}/../dev-data/data/tours-sample.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(400).json({
                status: "failed",
                message: err.message,
            });
        }
    );

    res.status(201).json({
        status: "success",
        data: {
            tour: newTour,
        },
    });
};

exports.getTourById = (req, res, next) => {
    const id = req.params.id * 1;
    const tour = tours.find((tour) => (tour.id = id));

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
