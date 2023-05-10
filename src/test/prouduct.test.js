const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../../index")
require("dotenv").config();
const { reqaddProduct, requpdateProduct } = require("../utils/data/product.test.data.js");

const token = "{YOUR TOKEN>}" 
let productId = 
//Create Product Test 
describe("POST /api/product/create", () => {
    test("should create a product", async () => {
        return request(app)
            .post("/api/product/create")
            .set('Authorization',  `Bearer ${token}`)
            .send(reqaddProduct)
            .expect(201)
            .then(({ body })=>{
                productId = body.data.productId
            })

    });
});


describe("GET /api/product/get", () => {
    test("should return all products", async () => {
        return request(app)
            .get("/api/product/get")
            .expect('Content-Type', /json/)
            .expect(200)
    });
});

describe("GET /api/product/show/:id", () => {
    test('should return all products', async () => {
        return request(app)
            .get(`/api/product/show/${productId}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
})

describe("PUT /api/product/update/:id", () => {
    test("should update a product", async () => {
        return request(app)
            .put(`/api/product/update/${productId}`)
            .set('Authorization',  `Bearer ${token}`)
            .send(requpdateProduct)
            .expect(201)
    });
});

describe("Checking authorization middleware", () => {
    test("should create a product", async () => {
        return request(app)
            .post("/api/product/create")
            .send(reqaddProduct)
            .expect(401)
    });
});

describe("DELETE /api/product/delete/:id", () => {
    test("should create a product", async () => {
        return request(app)
            .delete(`/api/product/delete/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(410)
    });
});