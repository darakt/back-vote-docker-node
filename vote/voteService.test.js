import { jest } from "@jest/globals";
import voteService from "./voteService.js";

const mPoolGenerator = (value) => ({
    query: jest.fn()
      .mockReturnValueOnce({ rows: value })
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
        const res = await voteService.getAllTheCandidatesIds(null)
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    })
  });

  describe("getCandidatesById", () => {
    it("Should give 1 id", async () => {
      let res = await voteService.getACandidateById([3], mPoolGenerator(id3));
      expect(res).toHaveLength(1);
      expect(res).toEqual(id3);
    });

    it("Should throw an error if db is down", async () => {
      try {
        const res = await voteService.getCandidatesById([1], crash());
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Should throw an error if no ids are given", async () => {
      try {
        const res = await voteService.getCandidatesById(null, mPoolGenerator(idList3));
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
