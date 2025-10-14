require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const schedule = require("node-schedule");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 450,
    standardHeaders: false,
    legacyHeaders: false,
    validate: {
        trustProxy: false,
    },
});

const app = express();
app.use(limiter);
app.use(cors());

app.set("trust proxy", 1);

app.use(express.json());
app.use(morgan("combined"));

const token = require("./Middleware/token");

const userRoutes = require("./Routes/userRoutes");
const gameRoutes = require("./Routes/gameRoutes");
const guessRoutes = require("./Routes/guessRoutes");

app.use("/api", gameRoutes);
app.use("/api", userRoutes);
app.use("/api", guessRoutes);

app.use(token);

module.exports = app;