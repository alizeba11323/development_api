import app from "./index";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import envConfig from "./config";
const server = http.createServer(app);

server.listen(envConfig.PORT, function () {
  console.log("app running on port " + envConfig.PORT + envConfig.NODE_ENV);
});
