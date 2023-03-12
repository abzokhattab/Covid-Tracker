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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureController = void 0;
const TemperatureService_1 = require("../services/TemperatureService");
class TemperatureController {
    constructor() {
        this.logTemperature = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { temperature, location } = req.body;
                const { coordinates } = location || {};
                const [latitude, longitude] = coordinates || [];
                const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.auth) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.sub;
                const result = yield this.temperatureService.logTemperature(temperature, longitude, latitude, userId);
                res.send(result);
            }
            catch (error) {
                console.error(error);
                res.status(400).send({ message: error.message });
            }
        });
        this.getTemperatures = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { latitude, longitude, radius } = req.query;
                const temperatures = yield this.temperatureService.getTemperatures(latitude, longitude, radius);
                res.send(temperatures);
            }
            catch (error) {
                console.log(error);
                res.status(400).send({ message: error.message });
            }
        });
        this.temperatureService = new TemperatureService_1.TemperatureService();
    }
}
exports.TemperatureController = TemperatureController;
//# sourceMappingURL=TemperatureController.js.map