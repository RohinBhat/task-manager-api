const express = require("express");
const {
  createUserController,
  loginUserController,
  logoutUserController,
  logoutAllUsersController,
  getUserProfileController,
  updateUserController,
  deleteUserController,
  uploadAvatarController,
  uploadErrorHandler,
  deleteAvatarController,
  getUserAvatarController,
} = require("../controllers/user.controller");

const auth = require("../middleware/auth");
const uploadAvatarMiddleware = require("../middleware/multer");

const router = new express.Router();

router.post("/users", createUserController);
router.post("/users/login", loginUserController);
router.post("/users/logout", auth, logoutUserController);
router.post("/users/logoutAll", auth, logoutAllUsersController);
router.get("/users/me", auth, getUserProfileController);
router.patch("/users/me", auth, updateUserController);
router.delete("/users/me", auth, deleteUserController);

router.post(
  "/users/me/avatar",
  auth,
  uploadAvatarMiddleware,
  uploadAvatarController,
  uploadErrorHandler
);
router.delete("/users/me/avatar", auth, deleteAvatarController);
router.get("/users/:id/avatar", getUserAvatarController);

module.exports = router;
