const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-sample.json`)
);

const getAllTours = (req, res, next) => {
    res.status(200).json({
        status: "success",
        count: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours,
        },
    });
};

const createTour = (req, res, next) => {
    console.log(req.body);

    const id = tours[tours.length - 1].id + 1;
    const newTour = { id: id, ...req.body };
    console.log(newTour);
    tours.push(newTour);

    fs.writeFileSync(
        `${__dirname}/dev-data/data/tours-sample.json`,
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

const getTourById = (req, res, next) => {
    if (
        isNaN(req.params.id * 1) ||
        req.params.id < 0 ||
        req.params.id * 1 > tours.length
    ) {
        return res.status(400).json({
            status: "Failed",
            message: "Invalid ID",
        });
    }

    const id = req.params.id * 1;
    const tour = tours.find((tour) => (tour.id = id));

    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
};

const updateTour = (req, res, next) => {
    if (
        isNaN(req.params.id * 1) ||
        req.params.id < 0 ||
        req.params.id * 1 > tours.length
    ) {
        return res.status(400).json({
            status: "Failed",
            message: "Invalid ID",
        });
    }

    res.status(200).json({
        status: "success",
        message: "not implemented yet!",
    });
};

const deleteTour = (req, res, next) => {
    if (
        isNaN(req.params.id * 1) ||
        req.params.id < 0 ||
        req.params.id * 1 > tours.length
    ) {
        return res.status(400).json({
            status: "Failed",
            message: "Invalid ID",
        });
    }

    res.status(204).json({
        status: "success",
        message: "not implemented yet!",
    });
};

const getAllUsers = (req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

const getUserById = (req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

const createUser = (req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

const updateUser = (req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

const deleteUser = (req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

app.use(morgan("dev"));

app.use((req, res, next) => {
    console.log("Hello from middleware!!");
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// app.route("/api/v1/tours/").get(getAllTours);
// app.route("/api/v1/tours/").post(createTour);
// app.route("/api/v1/tours/:id").get(getTourById);
// app.route("/api/v1/tours/:id").patch(updateTour);
// app.route("/api/v1/tours/:id").delete(deleteTour);

app.route("/api/v1/tours/").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id")
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour);

app.route("/api/v1/users/").get(getAllUsers).post(createUser);
app.route("/api/v1/users/:id")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser);

app.listen(3000);
