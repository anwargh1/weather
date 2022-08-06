const express = require("express");
const api = require("./server/routs/api");
const path =require("path")
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/weatherAppDb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);

const port = 3000;

app.listen(port, function () {
  console.log(`server run in port : ${port}`);
});
