"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureService = void 0;
const Temperature_1 = __importDefault(require("../models/Temperature"));
const UserService_1 = require("./UserService");
class TemperatureService {
    constructor() {
        this.temperatureModel = Temperature_1.default;
        this.userService = new UserService_1.UserService();
    }
    logTemperature(temperature, longitude, latitude, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserInfo(token);
            const { name, email, sub } = user;
            yield this.temperatureModel.deleteMany({ "user.id": sub });
            const newTemperature = new this.temperatureModel({
                temperature,
                location: {
                    type: "Point",
                    coordinates: [Number(longitude), Number(latitude)],
                },
                user: {
                    name,
                    email,
                    id: sub,
                },
                date: new Date(),
            });
            return yield newTemperature.save();
        });
    }
    getTemperatures(latitude, longitude, radius) {
        return __awaiter(this, void 0, void 0, function* () {
            const temperatures = yield this.temperatureModel.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [Number(longitude) || 0, Number(latitude) || 0],
                        },
                        maxDistance: Number(radius) * 1000,
                        spherical: true,
                        distanceField: "distance",
                    },
                },
            ]);
            return temperatures;
        });
    }
}
exports.TemperatureService = TemperatureService;
//# sourceMappingURL=TemperatureService.js.map