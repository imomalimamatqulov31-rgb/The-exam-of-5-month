const { globalError, ClientError } = require("shokhijakhon-error-handler");
const UserModel = require("../models/User.model");
const { registerValidator, profilevertificationValidator, resendOtpValidator, forgotPasswordValidator, resetPasswordValidator, loginValidator } = require("../utils/validator/auth.validator");
const { hash, compare } = require("bcrypt");
const { otpGenerator } = require("../utils/validator/generators/otp.generator");
const emailService = require("../lib/mail.service");
const jwtService = require("../lib/jwt.service");
const logger = require("../lib/winston.service");
const { log } = require("winston");


module.exports = {
    async REGISTER(req, res) {
        try {
         logger.debug(`REGISTER attempt with data: ${JSON.stringify(req.body)}`);
            let newUser = req.body
            await registerValidator.validateAsync(newUser);
        let findUser = await UserModel.findOne({email: newUser.email})
       if(findUser) {
        logger.warn(`REGISTER failed: email already exists: ${newUser.email}`);
        throw new ClientError("User already exists", 400)}
        newUser.password = await hash(newUser.password, 10)
            let { otp, otpTime } = await otpGenerator()
         await emailService(newUser.email, otp)
          await UserModel.create({
             ...newUser,
             otp,
             otpTime
         });
         return res.status(201).json({ message: "User registered successfully", status: 201 });
        
        } catch (err) {
           logger.error(`REGISTER error: ${err.message}`);
            return globalError(err, res);
            
        }
        
    },
    async VERIFY(req, res){
        try {
           logger.debug(`VERIFY attempt with data: ${JSON.stringify(req.body)}`);
            let profileData= req.body;
            await profilevertificationValidator.validateAsync(profileData);
            let findUser = await UserModel.findOne({email: profileData.email})
            if(!findUser) {
              logger.warn(`ACCAUNT VERIFICATION failed: user not found: ${profileData.email}`)
              throw new ClientError("User not found", 404)}
            let currentDate = Date.now();
        if(currentDate > findUser.otpTime) {
          logger.warn(`ACCAUNT VERIFICATION failed: otp expired: ${profileData.email}`)
          throw new ClientError("OTP expired", 400)};

        if(profileData.otp !== findUser.otp) {
          logger.warn(`ACCAUNT VERIFICATION failed: invalid otp: ${profileData.email}`)
          throw new ClientError("Invalid OTP", 400)};

        await UserModel.findOneAndUpdate({email: profileData.email}, {is_Verified: true})
        return res.status(200).json({ message: "User verified successfully", status: 200 });
     
        } catch (err) {
          logger.error(`ACCAUNT VERIFICATION error: ${err.message}`);
            return globalError(err, res);
            
        }

    },
  async RESEND_OTP(req, res){
  try {
    logger.debug(`RESEND_OTP attempt with data: ${JSON.stringify(req.body)}`);
    const profileData = req.body;
    await resendOtpValidator.validateAsync(profileData);

    const findUser = await UserModel.findOne({ email: profileData.email });
    if (!findUser) {
      logger.warn(`RESEND_OTP failed: user not found: ${profileData.email}`);
      throw new ClientError("User not found", 404)};
    if (findUser.is_Verified) {
      logger.warn(`RESEND_OTP failed: user already verified: ${profileData.email}`);
      throw new ClientError("User already verified", 400)};

    const { otp, otpTime } = await otpGenerator();
    await emailService(profileData.email, otp);

    await UserModel.findOneAndUpdate({ email: profileData.email }, { otp, otpTime });

    return res.status(200).json({ message: "OTP resent successfully", status: 200 });
  } catch (err) {
    logger.error(`RESEND_OTP error: ${err.message}`);
    return globalError(err, res);
  }
},
    async FORGOT_PASSWORD(req, res) {
    try {
      logger.debug(`FORGOT_PASSWORD attempt with data: ${JSON.stringify(req.body)}`);
      const profileData= req.body;
      await forgotPasswordValidator.validateAsync(profileData);

      const user = await UserModel.findOne({ email: profileData.email });
      if (!user) {
        logger.warn(`FORGOT_PASSWORD failed: user not found: ${profileData.email}`);
        throw new ClientError("User not found", 404)};

     
      if (!user.is_Verified) {
        logger.warn(`FORGOT_PASSWORD failed: user not verified: ${profileData.email}`);
        throw new ClientError("User is not verified", 400)};

      const { otp, otpTime } = await otpGenerator();

      await emailService(profileData.email, otp);

      await UserModel.findOneAndUpdate(
        { email: profileData.email },
        { resetOtp: otp, resetOtpTime: otpTime }
      );

      return res.status(200).json({ message: "Reset OTP sent", status: 200 });
    } catch (err) {
      logger.error(`FORGOT_PASSWORD error: ${err.message}`);
      return globalError(err, res);
    }
  },
  async RESET_PASSWORD(req, res) {
    try {
      logger.debug(`RESET_PASSWORD attempt with data: ${JSON.stringify(req.body)}`);
      const profileData= req.body;
      await resetPasswordValidator.validateAsync(profileData);

      const user = await UserModel.findOne({ email: profileData.email });
      if (!user) {
        logger.warn(`RESET_PASSWORD failed: user not found: ${profileData.email}`);
        throw new ClientError("User not found", 404)};

      if (!user.resetOtp || !user.resetOtpTime){
        logger.warn(`RESET_PASSWORD failed: reset otp not requested: ${profileData.email}`);
        throw new ClientError("Reset OTP not requested", 400)};

      const expires = new Date(user.resetOtpTime).getTime();
      if (Date.now() > expires) {
        logger.warn(`RESET_PASSWORD failed: otp expired: ${profileData.email}`);
        throw new ClientError("OTP expired", 400)};

      if (String(profileData.otp) !== String(user.resetOtp)){
        logger.warn(`RESET_PASSWORD failed: invalid otp: ${profileData.email}`);
        throw new ClientError("Invalid OTP", 400)};

      const secondHashed = await hash(profileData.newPassword, 10);

      await UserModel.findOneAndUpdate(
        { email: profileData.email },
        { password: secondHashed, resetOtp: null, resetOtpTime: null }
      );

      return res.status(200).json({ message: "Password updated", status: 200 });
    } catch (err) {
      logger.error(`RESET_PASSWORD error: ${err.message}`);
      return globalError(err, res);
    }
  },
  async LOGIN(req, res) {
  try {
    logger.debug(`LOGIN attempt with data: ${JSON.stringify(req.body)}`);
    const profileData= req.body;
    await loginValidator.validateAsync(profileData);

    const user = await UserModel.findOne({ email: profileData.email });
    if (!user) {
      logger.warn(`LOGIN failed: user not found: ${profileData.email}`);
      throw new ClientError("Invalid email or password", 400)};

 
    if (!user.is_Verified) {
      
      logger.warn(`LOGIN failed: user not verified: ${profileData.email}`);
    throw new ClientError("Please verify your account", 400)};

    const comparsion = await compare(profileData.password, user.password);
    if (!comparsion) {
      logger.warn(`LOGIN failed: invalid password: ${profileData.email}`);
      throw new ClientError("Invalid email or password", 400)};
    let accessToken = await jwtService.createAccsessToken({sub: user._id, role: user.role})
    let refershToken = await jwtService.createRefreshToken({sub: user._id, role: user.role})
    await user.updateOne({refresh_token: refershToken})

    res.cookie("refresh_token", refershToken,{
      maxAge: 90 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })


    return res.status(200).json({
      message: "Login successful",
      status: 200,
      accessToken
    });
  } catch (err) {
    logger.error(`LOGIN error: ${err.message}`);
    return globalError(err, res);
  }
},

async REFRESH(req, res){
  logger.debug(`REFRESH attempt with data: ${JSON.stringify(req.body)}`);
  let refreshToken = req.cookies.refresh_token;
  if(!refreshToken) {
    logger.warn(`REFRESH failed: no refresh token found`);
    throw new ClientError("Forbidden request", 403)}
    let findUser = await UserModel.findOne({refresh_token: refreshToken})
    if(!findUser) {
      logger.warn(`REFRESH failed: user not found or invalid refresh token`);
      throw new ClientError("Invalid refreshtoken ", 403)}

  let accessToken = jwtService.createAccsessToken({sub: findUser.id})

return res.json({message: "accessToken successfully generated", status: 200, accessToken})

}
};
    

