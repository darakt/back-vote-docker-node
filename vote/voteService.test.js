import { jest } from "@jest/globals";
import voteService from "./voteService.js";

const mPoolGenerator = (value) => ({
  connect: () => ({
    release: jest.fn(),
    query: jest.fn()
      .mockReturnValueOnce({ rows: value })
  }),
});

const mIds = [1, 3, 4];
const idList3 = [{ id: 1 }, { id: 3 }, { id: 4 }];
const idList2 = [{ id: 1 }, { id: 4 }]
const id3 = [{ id: 3 }];

const crash = jest.fn(() => {
  throw new Error();
})

const brokenPool = {
  connect: () => ({
    release: crash(),
    query: jest.fn().mockReturnValueOnce({ rows: null }),
  }),
};

describe("voteService", () => {
  afterEach(() => {
    // jest.clearAllMocks()
  })

  describe("getAllTheCandidatesIds", () => {
    it("Should give a list of ids", async () => {
      const res = await voteService.getAllTheCandidatesIds(mPoolGenerator(idList3));
      expect(res).toHaveLength(3);
      expect(res).toEqual(expect.arrayContaining(mIds));
    });

    it("Should throw an error if no db", async () => {
      try {
        const res = await voteService.getAllTheCandidatesIds({ connect: null })
        console.log(res)
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    })
  });

  describe("getCandidatesById", () => {
    it("Should give 1 id", async () => {
      let res = await voteService.getCandidatesById([3], mPoolGenerator(id3));
      expect(res).toHaveLength(1);
      expect(res).toEqual(id3);
    });
    it("Should give 2 id", async () => {
      let res = await voteService.getCandidatesById([3, 4], mPoolGenerator(idList2));
      expect(res).toHaveLength(2);
      expect(res).toEqual(idList2);
    });

    it("Should throw an error if db is", async () => {
      try {
        const res = await voteService.getCandidatesById([1], crash());
        console.log(res);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Should throw an error if no ids are given", async () => {
      try {
        const res = await voteService.getCandidatesById(null, mPoolGenerator(idList3));
        console.log(res);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Should throw an error if", async () => {
      try {
        const res = await voteService.getCandidatesById(
          [1 , 2],
          brokenPool()
        );
        console.log(res);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
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