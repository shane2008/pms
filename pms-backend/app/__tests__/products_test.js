const supertest = require("supertest");
const app = require("../../server");
const mysql = require("mysql");

describe("Products API", () => {

	it("should get all products with no params", async () => {
		const response = await supertest(app).get("/products");
		expect(response.status).toBe(200);
    expect(response.body.length).toBe(40);
  });

  it("should filter products by name", async () => {
    const response = await supertest(app)
      .get("/products")
      .query({ name: "t" })
		expect(response.status).toBe(200);
    expect(response.body.length).toBe(18);
  });

  it("should filter products by department Id", async () => {
    const response = await supertest(app)
      .get("/products")
      .query({ departmentId: 2 })
		expect(response.status).toBe(200);
    expect(response.body.length).toBe(11);
  });

  it("should filter products by active promo code", async () => {
    // 5%OFF is an inactive promo code
    const response = await supertest(app)
      .get("/products")
      .query({ promoCode: "5%off" })
		expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });
  
  it("should not include products using inactive promo code", async () => {
    // 15%OFF is an inactive promo code
    const response = await supertest(app)
      .get("/products")
      .query({ promoCode: "15%off" })
		expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  describe("Promote information", () => {

    it("should not include promote code or price if no promo attached", async () => {
      const response = await supertest(app).get("/products");
      const product = response.body.find(p => p.name === "Hand lotion");
      expect(product.promoActive).toBe(null);
      expect(product.promoCode).toBe(undefined);
      expect(product.discount).toBe(null);
      expect(product.promoPrice).toBe(undefined);
    });

    it("should not include promote code or price if inactive promo attached", async () => {
      const response = await supertest(app).get("/products");
      const product = response.body.find(p => p.name === "Face cream");
      expect(product.promoActive).toBe(0);
      expect(product.promoCode).toBe(undefined);
      expect(product.discount).toBe(10);
      expect(product.promoPrice).toBe(undefined);
    });

    it("should include promote code and price if active promo attached", async () => {
      const response = await supertest(app).get("/products");
      const product = response.body.find(p => p.name === "Tooth blush");
      expect(product.promoActive).toBe(1);
      expect(product.promoCode).toBe("25%OFF");
      expect(product.discount).toBe(25);
      expect(product.promoPrice).toBe("2.99");
    });
  });
  
  afterAll(async() => {
    app.close();
  });

});