const express = require("express");
const router = express.Router({ mergeParams: true });
const CreateForm = require("../models/createForm");
const createForms = require("../controllers/createForms");
const catchAsync = require("../utils/catchAsync");

router
    .route("/create")
    .get(createForms.renderCreateForm)
    .post(catchAsync(createForms.storeCreateForm));

router
    .route("/create/kategorije")
    .get(createForms.renderCreateKategorije)
    .post(catchAsync(createForms.storeCreateKategorije));

module.exports = router;
