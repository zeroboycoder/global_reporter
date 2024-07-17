const express = require("express");
const app = express();
const cors = require("cors");
const adminRoute = require("./routers");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/admin", adminRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));
