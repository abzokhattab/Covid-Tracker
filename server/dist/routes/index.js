"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TemperatureController_1 = require("../controllers/TemperatureController");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
const temperatureController = new TemperatureController_1.TemperatureController();
const userController = new UserController_1.UserController();
router.patch("/users", auth_1.jwtCheck, userController.updateUser);
router.get("/users", auth_1.jwtCheck, userController.getUser);
router.post("/temperatures", auth_1.jwtCheck, temperatureController.logTemperature);
router.get("/temperatures", temperatureController.getTemperatures);
router.use((req, res) => {
    res.status(404).send({ message: "Route not found" });
});
exports.default = router;
//# sourceMappingURL=index.js.map