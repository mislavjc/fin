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

router.route("/filter").get(forms.renderFilter);

router.get("/checkout", forms.renderCheckout);

router.get("/success", forms.renderSuccess);

router.get("/cancel", forms.renderCancel);

router.post("/starter", forms.checkoutStarter);

router.post("/premium", forms.checkoutPremium);

router.post("/enterprise", forms.checkoutEnterprise);

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
