const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

// console.log(app.get("env"));
// console.log(process.env);

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

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
