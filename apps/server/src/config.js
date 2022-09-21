require("dotenv").config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_TEST: process.env.DATABASE_URL_TEST,
};

function exportsConfig() {
  if (Object.values(config).some((v) => !v || v === ""))
    throw "Invalid Configuration!";
  else return config;
}

module.exports = exportsConfig();
