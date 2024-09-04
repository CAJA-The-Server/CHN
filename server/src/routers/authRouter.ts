import {
  getOwnUserDataController,
  loginController,
  logoutController,
} from "@/controllers/authController";
import { Router } from "express";

export const authRouter = Router();
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/me", getOwnUserDataController);