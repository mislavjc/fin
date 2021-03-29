const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const createForms = require("../controllers/createForms");

router
    .route("/create")
    .get(createForms.renderNumOfCategories)
    .post(catchAsync(createForms.storeNumOfCategories));

router
    .route("/create/kategorije")
    .get(createForms.renderCategoryNames)
    .post(catchAsync(createForms.storeCategoryNames));

module.exports = router;
