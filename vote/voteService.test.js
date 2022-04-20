import { jest } from "@jest/globals";
import voteService from "./voteService.js";

const mPool = {
  connect: () => ({
    release: jest.fn(),
    query: jest
      .fn()
      .mockReturnValueOnce({
        rows: [{ id: 1 }, { id: 3 }, { id: 4 }],
      })
      .mockReturnValueOnce({
        rows: [{ id: 3 }, { id: 4 }],
      }),
  })
};

const mIds = [1, 3, 4];



describe("voteService", () => {
  describe("getAllCandidatesIds", () => {

    it("Should give a list of ids", async () => {
      const res = await voteService.getAllCandidatesIds(mPool);
      console.log(res);
      expect(res).toHaveLength(3);
      expect(res).toEqual(expect.arrayContaining(mIds));
    });
  });
});


// jest.mock("pg", () => { // not working...
//   const mPool = {
//     connect: () => {
//       return {
//         release: jest.fn(),
//         query: jest
//           .fn()
//           .mockReturnValueOnce({
//             rows: [{ id: 1 }, { id: 3 }, { id: 4 }],
//           })
//           .mockReturnValueOnce({
//             rows: [{ id: 3 }, { id: 4 }],
//           }),
//       };
//     },
//     query: jest.fn(),
//     end: jest.fn(),
//     on: jest.fn(),
//   };
//   return { default: " { Pool: () => mPool }" };
// });

// jest.mock("../config.js", () => ({ // mocking ESM js is currently broken in jest -> https://github.com/facebook/jest/issues/10025#issuecomment-1090908651
//     __esModule: true,           // because of that we need to do dependencies injection...
//     default: {},
// }));

// const mockResponse = () => {
//     const res = {};
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//     res.send = jest.fn().mockReturnValue(res);
//     return res;
// };