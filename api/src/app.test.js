const request = require("supertest")
const {server} = require("./index")
const {db} = require("./database")


describe("Simple api response", ()=>{
    it("Get", async ()=>{
        await db
        return request(server)
            .get('/')
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res)=>{
                expect.objectContaining({
                    name: expect.any(String),
                    author: expect.any(String),
                    description: expect.any(String),
                    version: expect.any(String)
                })
            })
    })
})