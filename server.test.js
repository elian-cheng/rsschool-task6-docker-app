const request = require("supertest");
const app = require("./server");

describe("GET /", () => {
  it("should return the initial goal", async () => {
    const response = await request(app).get("/");
    expect(response.text).toContain("Learn Docker!");
  });
});

describe("POST /store-goal", () => {
  it("should update the goal", async () => {
    await request(app)
      .post("/store-goal")
      .send("goal=Learn Kubernetes!")
      .expect(302)
      .expect("Location", "/");

    const response = await request(app).get("/");
    expect(response.text).toContain("Learn Kubernetes!");
  });
});
