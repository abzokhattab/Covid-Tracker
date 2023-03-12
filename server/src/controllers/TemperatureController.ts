import { Request, Response } from "express";
import { TemperatureService } from "../services/TemperatureService";
import { IRequest } from "../types/IRequest";

export class TemperatureController {
  private temperatureService: TemperatureService;

  constructor() {
    this.temperatureService = new TemperatureService();
  }

  public logTemperature = async (req: IRequest, res: Response) => {
    try {
      const { temperature, location } = req.body;
      const { coordinates } = location || {};
      const [latitude, longitude] = coordinates || [];
      const userId = req?.auth?.payload?.sub;
      const result = await this.temperatureService.logTemperature(
        temperature,
        longitude,
        latitude,
        userId
      );
      res.send(result);
    } catch (error: any) {
      console.error(error);
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
