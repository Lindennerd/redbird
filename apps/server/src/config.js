require("dotenv").config({
  path: `../../.env.${process.env.NODE_ENV}`,
});

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
};

function exportsConfig() {
  if (Object.values(config).some((v) => !v || v === ""))
    throw "Invalid Configuration!";
  else return config;
}

module.exports = exportsConfig();
