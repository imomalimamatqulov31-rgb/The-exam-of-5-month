require("dotenv").config();
const path = require("path");
const express = require("express");
const Dbconnection = require("./lib/db.service");
const mianRouter = require("./router/main.routes");
const logger = require("./lib/winston.service");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { hash } = require("bcrypt");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./lib/swagger.config");



Dbconnection().catch(process.exit[1]);

const app = express();  
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use( "/photos", express.static( path.join( process.cwd(), "uploads", "carPhotos" ) ) );

app.use("/api", mianRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));  


hash("shohijahon1212", 10).then((pas) => console.log(pas));