import express, { Request, Response } from "express";
import UserController from "../controllers/UserController";
import TemperatureController from "../controllers/TemperatureController";
import { jwtCheck } from "../middlewares/auth";

const router = express.Router();

router.patch("/edit-name", jwtCheck, UserController.editName);
router.post("/temperature", jwtCheck, TemperatureController.logTemperature);
router.get("/temperatures", TemperatureController.getTemperatures);

router.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

export default router;
