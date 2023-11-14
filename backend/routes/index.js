const router = require("express").Router();
const userController = require("../controllers/user");
const fileController = require("../controllers/file");
const auth = require("../middleware/auth.js");
const { upload } = require("../middleware/multer");

// Map the `signup` request to the signup function
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/verify/:confirmationToken", userController.verifyEmail);
router.post("/upload", auth, upload.single("file"), fileController.upload);

module.exports = router;
