// import request from "supertest";
// import app from "../src/app";
// import db from "../src/services/DatabaseConnection";
// import Temperature, { ITemperature } from "../src/models/Temperature";
// import AuthService from "../src/services/AuthService";

// describe("API", () => {
//   let user: IUser;
//   let token: string;

//   beforeAll(async () => {
//     await db();
//     token = await AuthService.register(
//       "Test User",
//       "test@example.com",
//       "password"
//     );
//     user = (await User.findOne({ email: "test@example.com" })) as IUser;
//   });

//   afterAll(async () => {
//     await user.remove();
//     await Temperature.deleteMany({ user: user._id });
//   });

//   describe("POST /api/temperature", () => {
//     test("returns 401 if no auth token is provided", async () => {
//       const response = await request(app)
//         .post("/api/temperature")
//         .send({
//           temperature: 98.6,
//           location: {
//             type: "Point",
//             coordinates: [0, 0],
//           },
//         });
//       expect(response.status).toBe(401);
//     });

//     test("returns 400 if invalid data is provided", async () => {
//       const response = await request(app)
//         .post("/api/temperature")
//         .set("Authorization", `Bearer ${token}`)
//         .send({
//           temperature: "invalid",
//           location: {
//             type: "Point",
//             coordinates: [0, 0],
//           },
//         });
//       expect(response.status).toBe(400);
//     });

//     test("returns 201 if valid data is provided", async () => {
//       const response = await request(app)
//         .post("/api/temperature")
//         .set("Authorization", `Bearer ${token}`)
//         .send({
//           temperature: 98.6,
//           location: {
//             type: "Point",
//             coordinates: [0, 0],
//           },
//         });

//       expect(response.status).toBe(200);
//       const temperature: any = await Temperature.findById(response.body._id);
//       expect(temperature).not.toBeNull();
//       expect(temperature.temperature).toBe(98.6);
//       expect(temperature.location.type).toBe("Point");
//       expect(temperature.location.coordinates).toEqual([0, 0]);
//       expect(temperature.user).toStrictEqual(user._id);
//     });
//   });

//   describe("GET /api/temperatures", () => {
//     test("returns 401 if no auth token is provided", async () => {
//       const response = await request(app).get("/api/temperatures");
//       expect(response.status).toBe(401);
//     });

//     test("returns 200 with temperature data for authenticated user", async () => {
//       const response = await request(app)
//         .get("/api/temperatures?longitude=0&latitude=0&radius=1000")
//         .set("Authorization", `Bearer ${token}`);
//       expect(response.status).toBe(200);
//       expect(Array.isArray(response.body)).toBe(true);
//       expect(response.body[0].temperature).toBe(98.6);
//       expect(response.body[0].location.type).toBe("Point");
//       expect(response.body[0].location.coordinates).toEqual([0, 0]);
//     });
//   });
// });
