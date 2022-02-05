const Token = artifacts.require("Token");


// Using describe() instead of contract().
// Do not need "Clean-room environment" at this moment.
// https://trufflesuite.com/docs/truffle/testing/testing-your-contracts#clean-room-environment
describe("Token", () => {
    it("should have a name and symbol.", async () => {
        const name_ = "UltimatePowerfulBitcoin";
        const symbol_ = "UPBIT";

        const token = await Token.new(
            name_,
            symbol_,
        );
        assert.ok(token.address);
        assert.equal(name_, await token.name());
        assert.equal(symbol_, await token.symbol());
    });
});
