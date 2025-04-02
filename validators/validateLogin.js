import { body, validationResult } from "express-validator";

const loginValidationErrors = {
  emailErr: "must be a valid email address.",
  passwordErr: "must be at least 6 characters long.",
};

const validateLogin = [
  body("username")
    .trim()
    .isEmail()
    .withMessage(`Email ${loginValidationErrors.emailErr}`),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(`Password ${loginValidationErrors.passwordErr}`),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login", {
        errors: errors.array(),
      });
    }
    next();
  },
];

export { validateLogin };
