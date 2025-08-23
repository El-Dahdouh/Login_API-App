import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "./app.js"; // your Express app

// store tokens
let accessToken;
let refreshCookie;
let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Auth API Endpoints", () => {
  const testUser = {
    username: "testuser",
    email: "test@example.com",
    password: "123456",
  };

  // REGISTER
  it("POST /api/auth/register → should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  it("POST /api/auth/register → should fail if user already exists", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists");
  });

  // LOGIN
  it("POST /api/auth/login → should login and return access token + refresh cookie", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");

    accessToken = res.body.accessToken;
    refreshCookie = res.headers["set-cookie"][0]; // store refresh token cookie
    expect(refreshCookie).toMatch(/refreshToken=/);
  });

  it("POST /api/auth/login → should fail with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  // PROFILE
  it("GET /api/auth/profile → should get current user with valid token", async () => {
    const res = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user.email", testUser.email);
  });

  it("GET /api/auth/profile → should fail without token", async () => {
    const res = await request(app).get("/api/auth/profile");
    expect(res.statusCode).toBe(401);
  });

  // REFRESH
  it("POST /api/auth/refresh → should issue new access token with valid refresh cookie", async () => {
    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", refreshCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");

    accessToken = res.body.accessToken; // update with new one
  });

  it("POST /api/auth/refresh → should fail without refresh cookie", async () => {
    const res = await request(app).post("/api/auth/refresh");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "No refresh token provided");
  });

  // LOGOUT
  it("POST /api/auth/logout → should clear refresh cookie", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", refreshCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully");
    expect(res.headers["set-cookie"][0]).toMatch(/refreshToken=;/); // cleared
  });
});