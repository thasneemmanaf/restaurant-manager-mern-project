const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down... ");
  console.log(err);
  process.exit(1);
});

const app = require("./app");

const dbNames = {
  production: "sceats",
  test: "test-sceats",
  development: "dev-sceats",
};

const port = process.env.PORT;

const mongoConnectionString = process.env.DATABASE.replace(
  "<DB>",
  dbNames[process.env.NODE_ENV]
);

mongoose
  .connect(mongoConnectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to Database");
  });

const server = app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

// To catch all unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down... ");
  server.close(() => {
    process.exit(1);
  });
});
