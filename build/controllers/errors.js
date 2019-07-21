"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotFound = function (req, res, next) {
    res.status(404).render("errors/user-not-found", {
        pageTitle: "Not found"
    });
};
exports.getAdminNotFound = function (req, res, next) {
    res.status(404).render("errors/admin-not-found", {
        pageTitle: "Not found"
    });
};
exports.getWelcomeNotFound = function (req, res, next) {
    res.status(404).render("errors/welcome-not-found", {
        pageTitle: "Not found"
    });
};
