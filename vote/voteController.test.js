// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import voteController from "./voteController.js";
// import pool from "../config.js";

// // setup for to mock pool ofpg
// jest.mock('pg', () => {
//     const mPool = {
//         connect:  () => {
//             return {
//             release: jest.fn(),
//             query: jest.fn().mockReturnValueOnce({
//                 rows: [{ id: 1 }, { id: 3 }, { id: 4 }],
//             }).mockReturnValueOnce({
//                 rows: [{id: 3}, {id: 4}]
//             }),
//         };
//         },
//         query: jest.fn(),
//         end: jest.fn(),
//         on: jest.fn(),
//     };
//     return { Pool: jest.fn(() => mPool) };
// });

// const mockResponse = () => {
//     const res = {};
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//     res.send = jest.fn().mockReturnValue(res);
//     return res;
// };

// const reqMocked = () => {
//     const req = {};
//     return req;
// };

describe('voteController ', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    test('should give two random characters', async () => {
        // const res = mockResponse();
        // const req = reqMocked();
        // const ans = await voteController.get2RandomCharacters(req, res);
        // console.log("res.send.mock.instance ", res.send.mock.instance);
        // console.log(res.send.mock);
        // console.log(ans);
    });
});
