const app = require("converter-mb");

const path = require("path");
const { globalError, ClientError } = require("shokhijakhon-error-handler");
const { v4 } = require("uuid");


module.exports = (req, res, next) => {
    const allowedFormats = [".png", ".jpeg", ".jpg"];
    const allowedFileSize = 5 
    
    try{
        let carImage = req.files?.car_image
        let currentImasgeExt = path.extname(carImage.name);

        if(!allowedFormats.includes(currentImasgeExt)) {
            throw new ClientError("Invalid image format", 400)
        }
    const currentFileSize = app.bits(carImage.size) / (8 * 1024 * 1024);    
    if(currentFileSize > allowedFileSize) 
        throw new ClientError("Image size is too large", 400)
        req.filename = v4() + carImage.name
    
         return next()

    }catch(err){
        return globalError(err, res)
    }
}