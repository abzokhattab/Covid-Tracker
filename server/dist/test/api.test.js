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
const Temperature_1 = __importDefault(require("../src/models/Temperature"));
const TemperatureService_1 = require("../src/services/TemperatureService");
jest.mock("../src/services/UserService");
describe("TemperatureService", () => {
    let temperatureService;
    beforeEach(() => {
        temperatureService = new TemperatureService_1.TemperatureService();
    });
    describe("getTemperatures", () => {
        it("should return temperatures within the specified radius", () => __awaiter(void 0, void 0, void 0, function* () {
            const latitude = 2.345678;
            const longitude = 1.234567;
            const radius = 10;
            const temperatureMock = {
                temperature: 20,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
                user: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    id: "user-id",
                },
                date: new Date(),
            };
            jest
                .spyOn(Temperature_1.default, "aggregate")
                .mockResolvedValueOnce([temperatureMock]);
            const result = yield temperatureService.getTemperatures(latitude, longitude, radius);
            expect(Temperature_1.default.aggregate).toHaveBeenCalledTimes(1);
            expect(Temperature_1.default.aggregate).toHaveBeenCalledWith([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [longitude, latitude],
                        },
                        maxDistance: radius * 1000,
                        spherical: true,
                        distanceField: "distance",
                    },
                },
            ]);
            expect(result).toEqual([temperatureMock]);
        }));
    });
});
//# sourceMappingURL=api.test.js.map