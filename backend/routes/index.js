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

router.get("/file/:createdBy", auth, fileController.getAll);
router.get("/file/:createdBy/:fileId", auth, fileController.getFile);
router.get("/file", auth, fileController.searchFiles);
router.put("/file/:_id", auth, fileController.updateFile);

module.exports = router;
