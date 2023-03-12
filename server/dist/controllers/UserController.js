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
exports.UserController = void 0;
const Temperature_1 = __importDefault(require("../models/Temperature"));
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.editName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const update = req.body;
                const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.auth) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.sub;
                let result = yield this.userService.updateUserInfo(userId, update);
                yield Temperature_1.default.updateMany({ "user.id": userId }, { $set: this.parseUpdateInput(update) });
                res.send(result);
            }
            catch (err) {
                console.error(err);
                res.status(400).send({ message: err.message });
            }
        });
        this.userService = new UserService_1.UserService();
    }
    parseUpdateInput(input) {
        let output = {};
        for (const key in input) {
            output[`user.${key}`] = input[key];
        }
        return output;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map