import fetch from "node-fetch";
import nock from 'nock';
import assert from "assert";
import organization from './responses/organization.json' assert{ type: 'json' };
import orgBody from './requests/orgBody.json' assert{ type: 'json' };

// describe('================================Integration Test================================', () => {

//     beforeEach(() => {
//       nock('https://example.com')
//         .post('/api/data')
//         .reply(200, {success : true});
//     });

//     afterEach(() => {
//       nock.cleanAll();
//     });

//     it('should create organization', async () => {
//       const response = await fetch('https://example.com/api/data', {
//         method: 'POST',
//         body: JSON.stringify({ name: 'test item', price: 9.99 }),
//         headers: { 'Content-Type': 'application/json' }
//       });

//       expect(response.status).toBe(200);
//       const jsonResponse = await response.json();
//       console.log("===========]jsonResponse=============", jsonResponse);
//       expect(jsonResponse).toEqual({ name: 'test item', price: 9.99 });
//     });
//   });

describe('==================Integration Tests==================', () => {

    // --------------------------- test Case for create organization---------------------------

    it('Shoud create organization', async () => {
        // Set up the mock HTTP server using nock for post request
        const scope = nock('http://localhost:4000/api/v1')
            .post('/organization/new')
            .reply(200, organization);

        // Send the POST request using fetch with organization body
        const response = await fetch('http://localhost:4000/api/v1/organization/new', {
            method: 'POST',
            body: JSON.stringify(orgBody),
            headers: { 'Content-Type': 'application/json' },
        });

        // Verify that the response status is 200
        assert.equal(response.status, 200);

        // Parse the JSON response body and verify its contents
        const data = await response.json();

        assert.strictEqual(data.success, true)
        assert.strictEqual(data.response.userCode.prefix, "TO")
        assert.strictEqual(data.response.userCode.currentCode, 0)
        assert.equal(data.response.name, "Test Organization")

        // Verify that the nock mock server received the expected request
        assert(scope.isDone());
    });

    // --------------------------- test Case for Get organization By Id---------------------------

    it('Should return organization By Id', async () => {
        // Set up the mock HTTP server using nock for get request
        const scope = nock('http://localhost:4000/api/v1')
            .get('/organization/641b175923732c218f4fafa1')
            .reply(200, organization);

        // Create get request for getOrganizationById
        const response = await fetch('http://localhost:4000/api/v1/organization/641b175923732c218f4fafa1');
        const data = await response.json();

        assert.strictEqual(data.success, true)
        assert.equal(data.response._id, "641b175923732c218f4fafa1")
        assert.strictEqual(data.response.userCode.currentCode, 0)
        assert.equal(data.response.name, "Test Organization") 
        assert(scope.isDone());  
    })
    

    it('Should Update organization By Id', async () => {
        // Set up the mock HTTP server using nock for get request
        const scope = nock('http://localhost:4000/api/v1')
        .put('/organization/641b175923732c218f4fafa1', response)

        // Create get request for getOrganizationById
        const response = await fetch('http://localhost:4000/api/v1/organization/641b175923732c218f4fafa1');
        const data = await response.json();

        assert.strictEqual(data.success, true)
        assert.equal(data.response._id, "641b175923732c218f4fafa1")
        assert.strictEqual(data.response.userCode.currentCode, 0)
        assert.equal(data.response.name, "Test Organization") 
        assert(scope.isDone());  
    })
});