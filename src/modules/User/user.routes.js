import { Router } from "express";
import * as userController from "./user.controller.js";
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { signUpSchema } from "./user.validationSchemas.js";
import { multerMiddleWareHost } from "../../middlewares/multer.js";
import allowedExtensions from "../../utils/allowedExtensions.js";

const router = Router();

router.post(
  "/signup",
  validationMiddleware(signUpSchema),
  expressAsyncHandler(userController.signUpHandeler)
);
router.post("/login", expressAsyncHandler(userController.signInHandeler));
router.get("/user", auth(), expressAsyncHandler(userController.getUserProfile));
router.put(
  "/update",
  auth(),
  expressAsyncHandler(userController.updateAccount)
);
router.delete(
  "/delete",
  auth(),
  expressAsyncHandler(userController.deleteAccount)
);

export default router;
