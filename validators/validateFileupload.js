import fs from "fs";
const validateFileUpload = (req, res, next) => {
  const file = req.file;

  if (!file) {
    req.flash("error", "Please upload a file.");
    res.redirect("/uploadFile");
  }

  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
    "image/webp",
    "image/gif",
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    fs.unlinkSync(file.path);
    req.flash(
      "error",
      "❌ Only image files (png, jpg, svg, etc.) are allowed.."
    );
    return res.redirect("/upload-file");
  }

  if (file.size > 10 * 1024 * 1024) {
    fs.unlinkSync(file.path);
    req.flash("error", "❌ File must be less than 10MB.");
    return res.redirect("/upload-file");
  }

  next();
};

export { validateFileUpload };
