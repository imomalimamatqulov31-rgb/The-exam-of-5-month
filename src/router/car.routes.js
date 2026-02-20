const { Router } = require("express");
const carController = require("../controllers/car.controller");
const authGuard = require("../guard/auth.guard");
const carPhotoGuard = require("../guard/car.photo.guard");





const carRouter = Router();

carRouter.post("/create", authGuard, carPhotoGuard, carController.CREATE_CAR);

carRouter.get("/all", carController.GET_CAR)

carRouter.route("/:id")
.delete(carController.DELETE_CAR)
.put(carController.UPDATE_CAR)
.get(carController.GET_CAR)


module.exports = carRouter