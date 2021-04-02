const express = require("express");
const router = express.Router({ mergeParams: true });
const forms = require("../controllers/forms");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const { isOwner, isPaying, isVerified } = require("../middleware");

router
    .route("/form")
    .get(isVerified, isPaying, forms.renderForm)
    .post(
        isVerified,
        isPaying,
        upload.array("image"),
        catchAsync(forms.storeForm)
    );

router.route("/table").get(isVerified, isPaying, catchAsync(forms.renderTable));

router.route("/filter").get(isVerified, isPaying, forms.renderFilter).post(forms.filterOrders);

router.get("/checkout", forms.renderCheckout);

router.get("/success", forms.renderSuccess);

router.get("/cancel", forms.renderCancel);

router.post("/starter", forms.checkoutStarter);

router.post("/premium", forms.checkoutPremium);

router.post("/enterprise", forms.checkoutEnterprise);

router
    .route("/show")
    .get(isVerified, isPaying, catchAsync(forms.renderCardView));

router
    .route("/show/:id")
    .get(isVerified, isOwner, isPaying, catchAsync(forms.showForm))
    .delete(isVerified, isOwner, isPaying, catchAsync(forms.deleteForm));

router
    .route("/show/:id/edit")
    .get(isVerified, isOwner, isPaying, catchAsync(forms.renderEditForm))
    .put(
        isVerified,
        isOwner,
        isPaying,
        upload.array("image"),
        catchAsync(forms.updateForm)
    );

module.exports = router;
