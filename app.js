const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));
