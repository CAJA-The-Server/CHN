import { AuthController } from "@/controllers/auth-controller";
import { database } from "@/database/database";
import { authVerifier } from "@/middlewares/auth-verifier";
import { AuthService } from "@/services/auth-service";
import { Router } from "express";

export const authRouter = Router();
const service = new AuthService(database);
const controller = new AuthController(service);

authRouter.post("/verify-auth-token", (req, res, next) =>
  controller.verifyAuthToken(req, res).catch(next)
);

authRouter.post("/signup", (req, res, next) =>
  controller.signup(req, res).catch(next)
);

authRouter.post("/signin", (req, res, next) =>
  controller.signin(req, res).catch(next)
);

authRouter.post("/signout", (req, res, next) =>
  controller.signout(req, res).catch(next)
);

authRouter.get("/me", (req, res, next) =>
  controller.getCurrentUser(req, res).catch(next)
);

authRouter.post("/update-password", authVerifier, (req, res, next) =>
  controller.updatePassword(req, res).catch(next)
);
