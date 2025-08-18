import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiresIn: process.env.ACCESS_EXPIRES_IN || "15m",
  refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL,
};