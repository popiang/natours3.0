const fs = require("fs");
const Tour = require("../models/tourModel");

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    next();
};

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const parameters = { ...this.queryString };

        //* filtering
        const paramsToExclude = ["page", "limit", "sort", "fields"];
        paramsToExclude.forEach((param) => {
            delete parameters[param];
        });

        //* advance filtering
        let queryStr = JSON.stringify(parameters);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

		return this;
    }

	pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        // if (this.queryString.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (skip >= numTours) throw new Error("This page is not exist!!");
        // }

		return this;
	}
}

exports.getAllTours = async (req, res, next) => {
    try {
        // const parameters = { ...req.query };

        // //* build the query
        // //* filtering
        // const paramsToExclude = ["page", "limit", "sort", "fields"];
        // paramsToExclude.forEach((param) => {
        //     delete parameters[param];
        // });

        // //* advance filtering
        // let queryStr = JSON.stringify(parameters);
        // queryStr = queryStr.replace(
        //     /\b(gt|gte|lt|lte)\b/g,
        //     (match) => `$${match}`
        // );

        // let query = Tour.find(JSON.parse(queryStr));

        //* sort
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(",").join(" ");
        //     query = query.sort(sortBy);
        // } else {
        //     query = query.sort("-createdAt");
        // }

        //* limit fields
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(",").join(" ");
        //     query = query.select(fields);
        // } else {
        //     query = query.select("-__v");
        // }

        //* pagination
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1) * limit;
        // query = query.skip(skip).limit(limit);

        // if (req.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (skip >= numTours) throw new Error("This page is not exist!!");
        // }

        //* execute the query
        const features = new APIFeatures(Tour.find(), req.query).filter();
        const tours = await features.query;

        res.status(200).json({
            status: "success",
            count: tours.length,
            data: {
                tours,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.createTour = async (req, res, next) => {
    try {
        const newTour = await Tour.create(req.body);

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

exports.getTourById = async (req, res, next) => {
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.updateTour = async (req, res, next) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: "success",
            data: {
                tour: updatedTour,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.deleteTour = async (req, res, next) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};
