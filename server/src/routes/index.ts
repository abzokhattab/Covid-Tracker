import express, { Request, Response } from "express";
import { TemperatureController } from "../controllers/TemperatureController";
import { UserController } from "../controllers/UserController";
import { jwtCheck } from "../middlewares/auth";

const router = express.Router();

const temperatureController = new TemperatureController();
const userController = new UserController();
router.patch("/edit-name", jwtCheck, userController.editName);
router.post("/temperature", jwtCheck, temperatureController.logTemperature);
router.get("/temperatures", temperatureController.getTemperatures);

router.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

export default router;
