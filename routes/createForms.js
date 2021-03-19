const express = require("express");
const router = express.Router({ mergeParams: true });
const CreateForm = require("../models/createForm");
const createForms = require("../controllers/createForms");
const catchAsync = require("../utils/catchAsync");

router.route("/create").get(createForms.renderCreateForm);

module.exports = router;