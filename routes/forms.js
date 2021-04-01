const express = require("express");
const router = express.Router({ mergeParams: true });
const forms = require("../controllers/forms");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const { isOwner, isPaying } = require("../middleware");

router
    .route("/form")
    .get(isPaying, forms.renderForm)
    .post(isPaying, upload.array("image"), catchAsync(forms.storeForm));

router.route("/table").get(catchAsync(isPaying, forms.renderTable));

router.route("/filter").get(isPaying, forms.renderFilter);

router.get("/checkout", forms.renderCheckout);

router.get("/success", forms.renderSuccess);

router.get("/cancel", forms.renderCancel);

router.post("/starter", forms.checkoutStarter);

router.post("/premium", forms.checkoutPremium);

router.post("/enterprise", forms.checkoutEnterprise);

router.route("/show").get(isPaying, catchAsync(forms.renderCardView));

router
    .route("/show/:id")
    .get(isOwner, isPaying, catchAsync(forms.showForm))
    .delete(isOwner, isPaying, catchAsync(forms.deleteForm));

router
    .route("/show/:id/edit")
    .get(isOwner, isPaying, catchAsync(forms.renderEditForm))
    .put(
        isOwner,
        isPaying,
        upload.array("image"),
        catchAsync(forms.updateForm)
    );

module.exports = router;
