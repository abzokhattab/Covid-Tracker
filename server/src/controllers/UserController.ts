import { User } from "auth0";
import { Request, Response } from "express";
import Temperature from "../models/Temperature";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async editName(req: any, res: Response) {
    try {
      const update = req.body as Partial<User>;
      const userId = req?.auth?.payload?.sub;
      let result = await this.userService.updateUserInfo(userId, update);
      await Temperature.updateMany(
        { "user.id": userId },
        { $set: this.parseUpdateInput(update) }
      );

      res.send(result);
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }

  private parseUpdateInput(input: any) {
    let output = {} as any;
    for (const key in input) {
      output[`user.${key}`] = input[key] as any;
    }
    return output;
  }
}
