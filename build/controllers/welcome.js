"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWelcomePage = function (req, res, next) {
    res.render("welcome", {
        pageTitle: "Awesome bookstore"
    });
};
