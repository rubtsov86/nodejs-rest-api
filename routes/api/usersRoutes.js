const express = require("express");

const multer = require("multer");
const path = require("path");

const { ctrlWrapper } = require("../../helpers");

const { auth, validationBody } = require("../../middlewares");

const { updateSubscriptionSchema } = require("../../models/user");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({ storage: multerConfig });

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validationBody(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.addAvatar)
);

module.exports = router;
