const { Router } = require("express");
const authRouter = require("./auth.routes");
const carRouter = require("./car.routes");
const categoryRouter = require("./category.routes");
const authGuard = require("../guard/auth.guard");

const  mianRouter = Router();

mianRouter.use("/auth", authRouter);

mianRouter.use("/categories", categoryRouter)

mianRouter.use("/cars", carRouter);


module.exports = mianRouter;
