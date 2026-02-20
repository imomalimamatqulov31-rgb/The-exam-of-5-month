const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.use("/register", authController.REGISTER)
authRouter.use("/verify", authController.VERIFY)
authRouter.use("/resend/otp", authController.RESEND_OTP)
authRouter.post("/forgot/password", authController.FORGOT_PASSWORD);
authRouter.post("/reset/password", authController.RESET_PASSWORD);
authRouter.post("/login", authController.LOGIN)
authRouter.post("/refresh", authController.REFRESH)


module.exports = authRouter