import { UserService } from "../src/services/UserService";
import Temperature, { ITemperature } from "../src/models/Temperature";
import { TemperatureService } from "../src/services/TemperatureService";
import { User } from "../src/types/User";
import { userData } from "./fixtures/user";

jest.mock("../src/services/UserService");

describe("TemperatureService", () => {
  let temperatureService: TemperatureService;

  beforeEach(() => {
    temperatureService = new TemperatureService();
  });

  describe("getTemperatures", () => {
    it("should return temperatures within the specified radius", async () => {
      const latitude = 2.345678;
      const longitude = 1.234567;
      const radius = 10;
      const temperatureMock: Partial<ITemperature> = {
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
        .spyOn(Temperature, "aggregate")
        .mockResolvedValueOnce([temperatureMock]);

      const result = await temperatureService.getTemperatures(
        latitude,
        longitude,
        radius
      );

      expect(Temperature.aggregate).toHaveBeenCalledTimes(1);
      expect(Temperature.aggregate).toHaveBeenCalledWith([
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
    });
  });
});
