const express = require("express");

const app = express();


app.use("/users", (req, res, next) => {
    res.send(`<h4>Request url was ${req.url} </h4>`);
});
app.use("/", (req, res, next) => {
    res.send(`<h4>Request url was ${req.url}</h4>`);
});
app.listen(3000);

