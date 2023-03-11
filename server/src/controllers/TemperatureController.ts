import { Request, Response } from "express";
import { TemperatureService } from "../services/TemperatureService";

export class TemperatureController {
  private temperatureService: TemperatureService;

  constructor() {
    this.temperatureService = new TemperatureService();
  }

  public logTemperature = async (req: any, res: Response) => {
    try {
      const { temperature, location } = req.body;
      const { coordinates } = location || {};
      const [longitude, latitude] = coordinates || [];
      const token = req?.auth?.token;
      const result = await this.temperatureService.logTemperature(
        temperature,
        longitude,
        latitude,
        token
      );
      res.send(result);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };

  public getTemperatures = async (req: Request, res: Response) => {
    try {
      const { latitude, longitude, radius } = req.query as any;
      const temperatures = await this.temperatureService.getTemperatures(
        latitude,
        longitude,
        radius
      );
      res.send(temperatures);
    } catch (error: any) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  };
}
