const express = require("express");
const router = express.Router({ mergeParams: true });
const forms = require("../controllers/forms");
const catchAsync = require("../utils/catchAsync");

router.route("/form").get(forms.renderForm).post(catchAsync(forms.storeForm));

module.exports = router;