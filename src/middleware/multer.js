const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    } else {
      cb(undefined, true);
    }
  },
});

const uploadAvatarMiddleware = upload.single("avatar");

module.exports = uploadAvatarMiddleware;
