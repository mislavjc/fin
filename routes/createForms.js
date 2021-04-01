const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const createForms = require("../controllers/createForms");
const { isVerified } = require("../middleware");

router
    .route("/create")
    .get(isVerified, createForms.renderNumOfCategories)
    .post(isVerified, catchAsync(createForms.storeNumOfCategories));

router
    .route("/create/kategorije")
    .get(isVerified, createForms.renderCategoryNames)
    .post(isVerified, catchAsync(createForms.storeCategoryNames));

module.exports = router;
