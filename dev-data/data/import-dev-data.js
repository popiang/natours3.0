const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");

dotenv.config({ path: "./config.env" });

const database = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
).replace("<database_name>", process.env.DATABASE_NAME);

mongoose
    .connect(database, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Database is successfully connected!!");
    });

// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-sample.json`, "utf-8"));

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));

// import data into database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data successfully loaded!!");
    } catch (error) {
		console.log(error.message);
    }
	process.exit();
};

// delete all data from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data successfully deleted!!");
    } catch (error) {
		console.log(error.message);
    }
	process.exit();
};

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}

console.log(process.argv);
