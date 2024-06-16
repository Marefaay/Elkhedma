//Creating Server
const express = require("express");
const app = express();
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimiting = require("express-rate-limit");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const env = require("dotenv");
env.config();
//DB connection
const mongoose = require("mongoose");
const notFound = require("./middlewares/errorHandling/notFound");
const errorHandler = require("./middlewares/errorHandling/errorHandler");

mongoose
  .connect(process.env.MONGO_URL)
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log("Elkhedma DB Connected Succefully ^_^");
  });
//Middlewares
app.use(express.json());
app.use(xssClean());
app.use(mongoSanitize());
app.use(hpp());
app.use(helmet());
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000,
    limit: 100,
  })
);
//routes
app.use("/admins", require("./apis/adminRoutes"));
app.use("/users", require("./apis/userRoutes"));

app.use("*", (request, response) => {
  response.json({ messsage: "Not Found Page" });
});
//check
app.get("/", (req, res) => res.send("Hello World!"));
//Error Handlers
app.use(notFound);
app.use(errorHandler);
//Listining
// const port = 3000;
app.listen(process.env.PORT, () =>
  console.log(`Elkhedma app listening on port ${process.env.PORT}!`)
);
