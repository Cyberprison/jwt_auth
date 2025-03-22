const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error.js");

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({
            email
        });

        if (candidate) {
            throw ApiError.BadRequest(`User with email address ${email} is yet...`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await userModel.create({
            email,
            password: hashPassword,
            activationLink
        }); 

        //закомментил все, все апи гугл изменились, а изучать времени нет
        await mailService.sendActivationMail(
            email, 
            activationLink //`${process.env.API_URL}/api/activator/${activationLink}`
        );

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({
            ...userDto
        });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }
    async activate (activationLink) {
        const user = await userModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest("Неккоректная ссылка активации");
        }
        user.isActivated = true;
        await user.save();
    }

    async login (email, password) {
        const user = await userModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken); 
        return token;
    }
    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
    async getAllUsers(req, res, next) {
        const users = await userModel.find();
        return users;
    }
}

module.exports = new UserService();