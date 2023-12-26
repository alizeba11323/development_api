import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig;
console.log(stage);
if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else if (stage === "local") {
  envConfig = require("./local").default;
}

export default merge(
  {
    PORT: 3001,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECERT: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
  envConfig
);
