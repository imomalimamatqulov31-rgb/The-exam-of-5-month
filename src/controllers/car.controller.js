const path = require("path");
const { globalError, ClientError } = require("shokhijakhon-error-handler");
const carModel = require("../models/car.model");
const { createCarValidator } = require("../utils/validator/car.validator");
const { isValidObjectId } = require("mongoose");
const { log } = require("winston");
const logger = require("../lib/winston.service");


module.exports = {
    async CREATE_CAR(req, res) {
      try {
        
      logger.debug(`CREATE_CAR attempt with data: ${JSON.stringify(req.body)}`);
        let newCar = req.body

     
        await createCarValidator.validateAsync(newCar, {abortEarly: false});
  
  
       let insertCar =  await carModel.create(newCar);
        return res.status(201).json({ message: "Car created successfully", status: 201, insertCar });
        
      } catch (err) {
        logger.error(`CREATE_CAR error: ${err.message}`);
        return globalError(err, res);
        
      }
    },


    async GET_CAR(req, res) {
  try {
    logger.debug(`GET_CAR attempt with data: ${JSON.stringify(req.params)}`);
    let { id } = req.params;

    // ✅ /api/cars/{id}
    if (id) {
      if (!isValidObjectId(id)) throw new ClientError("Invalid object id", 400);
      const findCar = await carModel.findById(id);
      if (!findCar) {
        logger.warn(`GET_CAR failed: Car not found `);
        throw new ClientError("Car not found", 404);
      }
      return res.json(findCar);
    }

 
    const cars = await carModel.find();
    return res.status(200).json({ message: "List of cars", status: 200, cars });

  } catch (err) {
    logger.error(`GET_CAR error: ${err.message}`);
    return globalError(err, res);
  }
},
        async UPDATE_CAR(req, res) {
      try {
        logger.debug(`UPDATE_CAR attempt with data: ${JSON.stringify(req.body)}`);
         let {id} = req.params;
            if(id){
                if(!isValidObjectId(id)) {
                  

                  throw new ClientError('Invalid object id', 400)}
                    const findCar = await carModel.findById(id);
                if(!findCar) {
                    logger.warn(`UPDATE_CAR failed: Car not found `);
                  throw new ClientError("Car not found", 404)}
                let updateCarData = req.body
            await findCar.updateOne(updateCarData)
            return res.status(200).json({message: "Car successfully updated", status: 200})
            }
        
      } catch (err) {
        logger.error(`UPDATE_CAR error: ${err.message}`);
        return globalError(err, res);
        
      }
    },
        async DELETE_CAR(req, res) {
      try {
        logger.debug(`DELETE_CAR attempt with data: ${JSON.stringify(req.params)}`);
         let {id} = req.params;
            if(id){
                if(!isValidObjectId(id)) {
                  logger.warn(`DELETE_CAR failed: Invalid object id `);
                  throw new ClientError('Invalid object id', 400)}
                    const findCar = await carModel.findById(id);
                if(!findCar) {
                    logger.warn(`DELETE_CAR failed: Car not found `);
                  throw new ClientError("Car not found", 404)}
                      await userModel.findByIdAndDelete(findCar.user_id);
            await findCar.deleteOne()
            return res.status(200).json({message: "Car successfully deleted", status: 200})
            }
        
      } catch (err) {
        logger.error(`DELETE_CAR error: ${err.message}`); 
        return globalError(err, res);
        
      }
    }
}
