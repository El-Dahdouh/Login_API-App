import app from "./app.js";
import mongoose from "mongoose";
import { config } from "./config.js";

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected");

    app.listen(config.port, () => {
      console.log(`✅ Server running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error("❌ Server start error:", err);
  }
};

startServer();