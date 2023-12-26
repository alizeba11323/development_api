import express from "express";
import cors from "cors";
import morgan from "morgan";
import ProductRoutes from "./router";
import { Protect } from "./modules/auth";
import { LoginUser, createUser } from "./handler/user";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  req.shhh_secret = "secret";
  next();
});

const customLOgger = (message) => (req, res, next) => {
  console.log("hello from custom logger");
  next();
};
app.use("/api/v1", Protect, ProductRoutes);
app.post("/user", createUser);
app.post("/user/login", LoginUser);
app.get("/", function (req, res) {
  res.status(200).json({ message: "Hello" });
});

export default app;
