const supertest = require('supertest');
const app = require('../../server');
const mysql = require("mysql");

describe("Departments API", () => {

	it("should get all departments", async () => {
		const response = await supertest(app).get('/departments');
		expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0]).toEqual({id: 1, name: 'Clothing'});
  });
  
  afterAll(async() => {
    app.close();
  });

});