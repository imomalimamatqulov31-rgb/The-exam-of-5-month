const { default: mongoose } = require("mongoose");  


const Dbconnection = async () => {
    try {
        await mongoose.connect(process.env.dbUri);
        console.log("MongoDB successfully connected");
    } catch (error) {
        console.error(error);
    }
};

module.exports = Dbconnection;