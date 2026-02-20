const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const authGuard = require("../guard/auth.guard");
const adminGuard = require("../guard/admin.guard");


const categoryRouter = Router();



categoryRouter.post("/create", authGuard, adminGuard, categoryController.CREATE_CATEGORY);

categoryRouter.get("/all", authGuard, categoryController.GET_ALL_CATEGORIES);

categoryRouter.get("/:id/cars", authGuard, categoryController.GET_CATEGORY_CARS);
categoryRouter.get("/:id", authGuard, categoryController.GET_CATEGORY);


categoryRouter.route("/:id")
.put(authGuard, adminGuard, categoryController.UPDATE_CATEGORY)
.get(authGuard,adminGuard,categoryController.GET_CATEGORY)
.delete(authGuard,adminGuard,categoryController.DELETE_CATEGORY)


module.exports = categoryRouter