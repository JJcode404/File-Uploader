import { body, validationResult } from "express-validator";

const signupValidationErrors = {
  fullnameErr: "must be between 3 and 50 characters.",
  emailErr: "must be a valid email address.",
  passwordErr: "must be at least 6 characters long.",
  confirmPasswordErr: "must match the password.",
};

const validateSignup = [
  body("fullname")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(`Fullname ${signupValidationErrors.fullnameErr}`),

  body("email")
    .trim()
    .isEmail()
    .withMessage(`Email ${signupValidationErrors.emailErr}`),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(`Password ${signupValidationErrors.passwordErr}`),

  body("cfrmpassord")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(signupValidationErrors.confirmPasswordErr);
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }
    next();
  },
];

export { validateSignup };
