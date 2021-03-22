const express = require("express");
const router = express.Router({ mergeParams: true });
const form = require("../controllers/forms");
const catchAsync = require("../utils/catchAsync");

router.route("/form").get(form.renderForm)

module.exports = router;