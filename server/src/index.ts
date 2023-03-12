require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
import db from "./services/DatabaseConnection";

db();
const app = express();

app.use(express.json());
app.use(morgan("tiny") as express.RequestHandler);
//app.use(cors());

// req.isAuthenticated is provided from the auth router
app.get("/", (req: any, res) => {
  res.send("hello");
});

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
