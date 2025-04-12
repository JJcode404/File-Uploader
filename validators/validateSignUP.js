import { body, validationResult } from "express-validator";

const signupValidationErrors = {
  fullnameErr: "must be between 3 and 50 characters.",
  emailErr: "must be a valid email address.",
  fullnameErr: "must be between 3 and 50 characters.",
  passwordErr: "must be at least 6 characters long.",
  confirmPasswordErr: "must match the password.",
};

const validateSignup = [
  body("fullname")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(`Fullname ${signupValidationErrors.fullnameErr}`)
    .custom((value) => {
      const words = value.split(" ").filter(Boolean);
      if (words.length < 2) {
        throw new Error("Fullname must contain at least first and last name.");
      }
      return true;
    }),

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
        oldInput: req.body,
      });
    }
    next();
  },
];

export { validateSignup };
