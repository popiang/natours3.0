const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-sample.json`)
);

app.get("/", (req, res, next) => {
    res.status(200).json({
        status: "success",
        count: tours.length,
        data: {
            tours,
        },
    });
});

app.post("/", (req, res, next) => {
    console.log(req.body);

    const id = tours[tours.length - 1].id + 1;
    const newTour = { id: id, ...req.body };
    tours.push(newTour);

    fs.writeFileSync(
        `${__dirname}/dev-data/data/tours-sample.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    data: newTour,
                },
            });
        }
    );

    res.status(200).json({
        status: "success",
    });
});

app.listen(3000);
