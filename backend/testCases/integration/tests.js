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

    // ----------(1)----------------- test Case for create organization---------------------------

    it('(1) Shoud create organization', async () => {
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

        assert.equal(response.status, 200);
        const data = await response.json();

        assert.strictEqual(data.success, true)
        assert.strictEqual(data.response.userCode.prefix, "TO")
        assert.strictEqual(data.response.userCode.currentCode, 0)
        assert.equal(data.response.name, "Test Organization")

        // Verify that the nock mock server received the expected request
        assert(scope.isDone());
    });


    // ------(2)---------test case if currentCode  >=0 throw error-------------

    it('(2) Shoud not create organization when currentCode >= 0', async () => {

        const scope = nock('http://localhost:4000/api/v1')
            .post('/organization/new')
            .reply(401, {
                success: false,
                error: "currentCode can not be >= 0"
            });

        orgBody.userCode.currentCode = 5;
        const response = await fetch('http://localhost:4000/api/v1/organization/new', {
            method: 'POST',
            body: JSON.stringify(orgBody),
            headers: { 'Content-Type': 'application/json' },
        });
        assert.equal(response.status, 401);
        const data = await response.json();
        assert.strictEqual(data.success, false);
        assert.equal(data.error, "currentCode can not be >= 0");

        assert(scope.isDone());
    });


    // --------(3)-------test case if userCode is undefined throw error-------------

    it('(3) Shoud not create organization when usercode is undefined', async () => {

        const scope = nock('http://localhost:4000/api/v1')
            .post('/organization/new')
            .reply(401, {
                success: false,
                error: "usercode is undefined"
            });

        orgBody.userCode = undefined;
        const response = await fetch('http://localhost:4000/api/v1/organization/new', {
            method: 'POST',
            body: JSON.stringify(orgBody),
            headers: { 'Content-Type': 'application/json' },
        });
        assert.equal(response.status, 401);
        const data = await response.json();
        assert.strictEqual(data.success, false);
        assert.equal(data.error, "usercode is undefined");

        assert(scope.isDone());
    });


    // ---------(4)------------------ test Case for Get organization By Id---------------------------

    it('(4) Should return organization By Id', async () => {
        const scope = nock('http://localhost:4000/api/v1')
            .get('/organization/641b175923732c218f4fafa1')
            .reply(200, organization);

        const response = await fetch('http://localhost:4000/api/v1/organization/641b175923732c218f4fafa1');
        const data = await response.json();

        assert.strictEqual(data.success, true)
        assert.equal(data.response._id, "641b175923732c218f4fafa1")
        assert.strictEqual(data.response.userCode.currentCode, 0)
        assert.equal(data.response.name, "Test Organization")
        assert(scope.isDone());
    })

    // --------------------------- test Case for Update organization By Id---------------------------

    // it('Should Update organization By Id', async () => {
    //     // Set up the mock HTTP server using nock for get request
    //     const scope = nock('http://localhost:4000/api/v1')
    //         .put('/organization/641b175923732c218f4fafa1', {})

    //     // Create get request for getOrganizationById
    //     const response = await fetch('http://localhost:4000/api/v1/organization/641b175923732c218f4fafa1');
    //     const data = await response.json();

    //     assert.strictEqual(data.success, true)
    //     assert.equal(data.response._id, "641b175923732c218f4fafa1")
    //     assert.strictEqual(data.response.userCode.currentCode, 0)
    //     assert.equal(data.response.name, "Test Organization")
    //     assert(scope.isDone());
    // })
});