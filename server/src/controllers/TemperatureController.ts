import { Request, Response } from "express";
import { getUserInfo } from "../helpers/getUserInfo";
import Temperature from "../models/Temperature";
import { User } from "../types/User";

export default class TemperatureController {
  public static async logTemperature(req: any, res: Response) {
    try {
      const { temperature, location } = req.body;
      const longitude = location?.coordinates[0];
      const latitude = location?.coordinates[1];
      const token = req?.auth?.token;
      const user: User = await getUserInfo(token);
      const { name, email, sub } = user;
      //removing old temperature
      await Temperature.deleteMany({ "user.id": sub });
      const newTemperature = new Temperature({
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
      res.send(await newTemperature.save());
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }

  public static async getTemperatures(req: Request, res: Response) {
    try {
      const { latitude, longitude, radius } = req.query;
      const temperatures = await Temperature.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)],
            },
            maxDistance: Number(radius) * 1000,
            spherical: true,
            distanceField: "distance",
          },
        },
      ]);
      res.send(temperatures);
    } catch (err: any) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  }
}
