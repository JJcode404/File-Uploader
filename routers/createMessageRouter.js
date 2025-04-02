import { Router } from "express";
import {
  createMessagePage,
  postUserMessage,
} from "../controllers/createMessage.js";

const messageRouter = Router();
messageRouter.get("/", createMessagePage);
messageRouter.post("/", postUserMessage);

export { messageRouter };
