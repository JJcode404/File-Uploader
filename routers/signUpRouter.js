import { Router } from "express";
import { postUserDetails, singUppage } from "../controllers/signup.js";
import { validateSignup } from "../validators/validateSignUP.js";

const signRouter = Router();
signRouter.get("/", singUppage);
signRouter.post("/", validateSignup, postUserDetails);

export { signRouter };
