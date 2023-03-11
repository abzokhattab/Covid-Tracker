import { User } from "../types/User";
import Temperature, { ITemperature } from "../models/Temperature";
import { UserService } from "./UserService";

export class TemperatureService {
  private readonly temperatureModel: typeof Temperature;
  private readonly userService: UserService;

  constructor() {
    this.temperatureModel = Temperature;
    this.userService = new UserService();
  }

  public async logTemperature(
    temperature: number,
    longitude: number | undefined,
    latitude: number | undefined,

    token: string
  ) {
    const user: User = await this.userService.getUserInfo(token);
    const { name, email, sub } = user;
    await this.temperatureModel.deleteMany({ "user.id": sub });
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
    return await newTemperature.save();
  }

  public async getTemperatures(
    latitude: Number,
    longitude: Number,
    radius: Number
  ) {
    const temperatures = await this.temperatureModel.aggregate([
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
  }
}
