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
    longitude: number,
    latitude: number,
    userId: string
  ) {
    const user: User = await this.userService.getUserInfo(userId);
    const { name, email, user_id } = user;
    await this.temperatureModel.deleteMany({ "user.id": user_id });
    const newTemperature = new this.temperatureModel({
      temperature,
      location: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
      },
      user: {
        name,
        email,
        id: user_id,
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
