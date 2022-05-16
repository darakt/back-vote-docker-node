import { jest } from "@jest/globals";
import tokenService from "./tokenService";
import { uuidv4 } from "../helpers";

const mPoolGenerator = (value) => ({
    connect: () => ({
    release: jest.fn(),
    query: jest.fn().mockReturnValueOnce(value),
    }),
});
const token = 'xxxx-xxxxx'

const success_insert = {
    oid: 0,
    rowCount: 1,
    command: 'INSERT'
}



describe.only("tokenService", () => {
    beforeEach(() => {
        // jest.mock("../helpers", () => {
        //     const original = jest.requireActual("../helpers");
        //     return {
        //     __esmodule: true,
        //     // ...original,
        //     uuidv4: jest.fn(() => token),
        //     };
        // });

        jest.mock('../helpers', () => ({
            uuidv4: jest.fn(() => token),
        }));
    })

    describe("createToken", () => {
        it("Should create a token", async () => {
            console.log(uuidv4());
            let mPool = mPoolGenerator(success_insert);
            const res = await tokenService.createToken(1, mPool)
            expect(res).toEqual(token)
        })
    })
})