import fetch from "node-fetch";
import nock from 'nock';
import assert from "assert";
import organizationResponse from './responses/organizationResponse.json' assert{ type: 'json' };
import organizationRequest from './requests/organizationBody.json' assert{ type: 'json' };

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
    //  test Case for create organization
    it('Shoud create organization', async () => {
        // Set up the mock HTTP server using nock
        const scope = nock('http://localhost:4000/api/v1')
            .post('/organization/new')
            .reply(200, organizationResponse);

        // Send the POST request using fetch
        const response = await fetch('http://localhost:4000/api/v1/organization/new', {
            method: 'POST',
            body: JSON.stringify(organizationRequest),
            headers: { 'Content-Type': 'application/json' },
        });

        // Verify that the response status is 200
        assert.equal(response.status, 200);

        // Parse the JSON response body and verify its contents
        const responseBody = await response.json();

        assert.strictEqual(responseBody.success, true)
        assert.strictEqual(responseBody.response.userCode.prefix , "TO")
        assert.strictEqual(responseBody.response.userCode.currentCode , 0)

        // Verify that the nock mock server received the expected request
        assert(scope.isDone());
    });
});