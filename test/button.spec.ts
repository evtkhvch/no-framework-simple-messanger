import { expect } from "chai";

import { hello } from "./hello";

describe("Typescript + Babel usage suite", () => {
    it("should return string correctly", () => {
        expect(hello("mocha"), "Hello mocha");
    });
});
