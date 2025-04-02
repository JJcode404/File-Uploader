import { Router } from "express";
import { passcodePage, verifyPasscode } from "../controllers/passcode.js";

const passcodeRouter = Router();
passcodeRouter.get("/", passcodePage);
passcodeRouter.post("/", verifyPasscode);

export { passcodeRouter };
