const otpGenerator = () => {
    
    let randomNumbers = Array.from({length: 6}, () => Math.floor(Math.random() * 9)).join("")
    let otpTime = Date.now() + 2 * 60 * 1000
    return { otp: Number(randomNumbers), otpTime };
}

module.exports = {otpGenerator};       