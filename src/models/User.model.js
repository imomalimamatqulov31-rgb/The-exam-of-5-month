const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    
    }, 
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        
    },     
    
    otp: {
        type: String,
        required: true,
    }, 
    otpTime: {
        type: Date,
       
    },
    resetOtp: { type: String, default: null },
  resetOtpTime: { type: Date, default: null },
    is_Verified: {
        type: Boolean,
        default: false
    },
    refresh_token: { type: String, default: null }
},{
    versionKey: false,
    timestamps: true
});

module.exports = model("users", UserSchema);