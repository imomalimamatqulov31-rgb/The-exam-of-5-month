const { globalError, ClientError } = require("shokhijakhon-error-handler");
const categoryModel = require("../models/category.model");
const { isValidObjectId } = require("mongoose");
const carModel = require("../models/car.model");
const logger = require("../lib/winston.service");
const { log } = require("winston");
const { createCategoryValidator } = require("../utils/validator/category.validator");

module.exports = {
    async CREATE_CATEGORY(req, res) {
    try {
        logger.debug(`CREATE_CATEGORY attempt with data: ${JSON.stringify(req.body)}`);

        let newCategory = req.body;
       
        await createCategoryValidator.validateAsync(newCategory);
        const lastCategory = await categoryModel.findOne().sort({ category_number: -1 });
        const newNumber = lastCategory ? lastCategory.category_number + 1 : 1;

        newCategory.category_number = newNumber;
        const insertCategory = await categoryModel.create(newCategory);
        return res.status(201).json({message: "Category created successfully",status: 201,});

    } catch (err) {
        logger.error(`CREATE_CATEGORY error: ${err.message}`);
        return globalError(err, res);
    }
},
async GET_CATEGORY(req, res) {
  try {
    logger.debug(`GET_CATEGORY attempt with data: ${JSON.stringify(req.params)}`);

    const { id } = req.params;

    if (!id) {
      throw new ClientError("Category id is required", 400);
    }

    if (!isValidObjectId(id)) {
      throw new ClientError("Invalid object id", 400);
    }

    const findCategory = await categoryModel.findById(id);
    if (!findCategory) {
      throw new ClientError("Category not found", 404);
    }

    return res.status(200).json({ status: 200, data: findCategory });

  } catch (err) {
    logger.error(`GET_CATEGORY error: ${err.message}`);
    return globalError(err, res);
  }
},
async GET_CATEGORY_CARS(req, res) {
  try {
    logger.debug(`GET_CATEGORY_CARS attempt with data: ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      logger.warn(`GET_CATEGORY_CARS failed: Invalid object id`);
      throw new ClientError("Invalid category id", 400);
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      logger.warn(`GET_CATEGORY_CARS failed: category not found`);
      throw new ClientError("Category not found", 404);
    }
    const cars = await carModel.find({ category_id: category._id });
    return res.status(200).json({ status: 200, data: cars });
  } catch (err) {
    logger.error(`GET_CATEGORY_CARS error: ${err.message}`);
    return globalError(err, res);
  }
},
    async GET_ALL_CATEGORIES(req, res) {
        try {
            logger.debug(`GET_ALL_CATEGORIES attempt with data: ${JSON.stringify(req.params)}`);
            const categories = await categoryModel.find({ user_id: req.user.sub });
            return res.status(200).json({ status: 200, data: categories });
        } catch (err) {
            logger.error(`GET_ALL_CATEGORIES error: ${err.message}`);
            return globalError(err, res);
        }
    },
    async UPDATE_CATEGORY(req, res) {
        try {
            logger.debug(`UPDATE_CATEGORY attempt with data: ${JSON.stringify(req.body)}`);
            let { id } = req.params;
            if (id) {
                if (!isValidObjectId(id)) {
                    logger.warn(`UPDATE_CATEGORY failed: Invalid object id `)
                    throw new ClientError('Invalid object id', 400)}
                const findCategory = await categoryModel.findById(id);
                if (!findCategory) {
                    logger.warn(`UPDATE_CATEGORY failed: Category not found `)
                    throw new ClientError("Category not found", 404)}
                let updateCategoryData = req.body
                await findCategory.updateOne(updateCategoryData)
                return res.status(200).json({ message: "Category successfully updated", status: 200 })
            }
        } catch (err) {
            logger.error(`UPDATE_CATEGORY error: ${err.message}`);
            return globalError(err, res);
        }

    },
    async DELETE_CATEGORY(req, res) {
        try {
            logger.debug(`DELETE_CATEGORY attempt with data: ${JSON.stringify(req.params)}`);
            let { id } = req.params;
            if (id) {
                if (!isValidObjectId(id)) {
                    logger.warn(`DELETE_CATEGORY failed: Invalid object id `)
                    throw new ClientError('Invalid object id', 400)}
                const findCategory = await categoryModel.findById(id);
                if (!findCategory) {
                    logger.error(`DELETE_CATEGORY failed: Category not found `)
                    throw new ClientError("Category not found", 404)}
                     await carModel.deleteMany({ category_id: id });
                await findCategory.deleteOne()
                return res.status(200).json({ message: "Category successfully deleted", status: 200 })
            }
        } catch (err) {
            logger.error(`DELETE_CATEGORY error: ${err.message}`);
            return globalError(err, res);
        }
    }
}