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

router.route("/table").get(catchAsync(forms.renderTable));

router.route("/filter").get(forms.renderFilter)

router.route("/show").get(catchAsync(forms.renderCardView));

router
    .route("/show/:id")
    .get(catchAsync(forms.showForm))
    .delete(catchAsync(forms.deleteForm));

router
    .route("/show/:id/edit")
    .get(catchAsync(forms.renderEditForm))
    .put(upload.array("image"), catchAsync(forms.updateForm));

module.exports = router;
