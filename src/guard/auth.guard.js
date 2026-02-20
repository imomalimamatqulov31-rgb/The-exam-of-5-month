const { globalError, ClientError } = require("shokhijakhon-error-handler");
const { parseAccessToken } = require("../lib/jwt.service");


module.exports = (req, res, next) => {
    try {
        let atuh = req.headers.authorization;
        if(!atuh) throw new ClientError("Unauthorized", 401);
        const tokenType = atuh.split(" ")[0];
        const accessToken = atuh.split(" ")[1];
        if (tokenType !== "Bearer" || !accessToken) throw new ClientError("Forbidden request", 403);
     let parseToken = parseAccessToken(accessToken)
     req.user = parseToken
        return next();
    } catch (err) {
        if(err.name == "TokenExpiredError"){
            return res.status(403).json({
                code: "TOKEN_EXPIRED",
                message: "AccessToken expired"
            })
        };
        return globalError(err,res)

        
    }
}