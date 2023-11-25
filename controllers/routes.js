const express = require("express");
const app = express();

app.use("/usuario", require("./user"));
app.use("/tag", require("./tag"));
app.use("/finanza", require("./finanza"));

module.exports = app;
