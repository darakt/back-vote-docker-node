import voteService from './voteService.js';

import pool from "../config.js";

// setup for to mock pool ofpg
jest.mock("pg", () => {
    const mPool = {
        connect: () => {
        return {
            release: jest.fn(),
            query: jest
            .fn()
            .mockReturnValueOnce({
                rows: [{ id: 1 }, { id: 3 }, { id: 4 }],
            })
            .mockReturnValueOnce({
                rows: [{ id: 3 }, { id: 4 }],
            }),
        };
        },
        query: jest.fn(),
        end: jest.fn(),
        on: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});


describe('voteService', async () => {
    describe('getAllCandidatesIds', async() => {
        it('Should give a list of ids', async () => {
            const res = await voteService.getAllCandidatesIds();
            expect(res).toHaveLength(3);
        });
    })
})