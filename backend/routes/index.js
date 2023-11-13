const router = require("express").Router(); // Ge the router instance of Express
const userController = require("../controllers/user"); // Get all exported functions in the user controller

// Map the `signup` request to the signup function
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/verify/:confirmationToken", userController.verifyEmail);
router.post("/upload", auth, upload.single("file"), fileController.upload);

module.exports = router;
