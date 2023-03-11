import { User } from "auth0";
import { Request, Response } from "express";
import { updateUser } from "../helpers/updateUserInfo";
import Temperature from "../models/Temperature";

export default class UserController {
  public static async editName(req: any, res: Response) {
    try {
      const update = req.body as Partial<User>;
      const userId = req?.auth?.payload?.sub;
      let result = await updateUser(userId, update);
      await Temperature.updateMany(
        { "user.id": userId },
        { $set: parseUpdateInput(update) }
      );

      res.send(result);
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }
}

function parseUpdateInput(input: any) {
  let output = {} as any;
  for (const key in input) {
    output[`user.${key}`] = input[key] as any;
  }
  return output;
}
