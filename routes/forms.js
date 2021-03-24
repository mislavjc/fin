const express = require("express");
const router = express.Router({ mergeParams: true });
const forms = require("../controllers/forms");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
    .route("/form")
    .get(forms.renderForm)
    .post(upload.array("image"), catchAsync(forms.storeForm));

router.route("/show").get(catchAsync(forms.formData));

router
    .route("/show/:id")
    .get(catchAsync(forms.showForm))
    .delete(catchAsync(forms.deleteForm));

router
    .route("/show/:id/edit")
    .get(catchAsync(forms.renderEditForm))
    .put(upload.array("image"), catchAsync(forms.updateForm));

module.exports = router;
