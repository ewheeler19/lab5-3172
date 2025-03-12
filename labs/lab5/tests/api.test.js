const request = require("supertest");
const app = require("./api.js");

test("should return recipes", async () => {
    const res = await request(app).get("/api/recipes?ingredients=tomato&diet=vegetarian");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});
