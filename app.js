const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(require("./routers/comment"));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));
