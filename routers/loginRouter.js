import { Router } from "express";
import { authenticateUser, loginPage } from "../controllers/login.js";
import { validateLogin } from "../validators/validateLogin.js";

const loginRouter = Router();
loginRouter.get("/", loginPage);
loginRouter.post("/", validateLogin, authenticateUser);

export { loginRouter };
