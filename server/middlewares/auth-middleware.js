const ApiError = require("../exceptions/api-error.js");
const tokenService = require("../service/token-service.js");

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        console.log(authorizationHeader);
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        
        //тк в сваггере я указываю просто токен
        //а не `Bearer ${token}`
        //по я беру нулевой сплит
        const accessToken = authorizationHeader.split(' ')[0];

        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}