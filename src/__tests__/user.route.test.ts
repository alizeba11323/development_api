import supertest from "supertest";
import app from "..";

describe("testing user route", () => {
  it("testing user route bpody", async () => {
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("Hello");
  });
});
