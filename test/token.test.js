const Token = artifacts.require("Token");


contract("Token", (accounts) => {
    let name_;
    let symbol_;
    let initial_;
    let token;

    before("create a token contract", async () => {
        name_ = "UltimatePowerfulBitcoin";
        symbol_ = "UPBIT";
        initial_ = 1000000;

        token = await Token.new(
            name_,
            symbol_,
            initial_,
            accounts[0]
        );
    });

    it("should have a name, symbol and own address.", async () => {
        assert.ok(token.address);
        assert.equal(name_, await token.name());
        assert.equal(symbol_, await token.symbol());
    });

    it("should mint initial amount of ERC-20 tokens to contract caller.", async () => {
        let balance = await token.balanceOf(accounts[0]);
        assert.equal(
            web3.utils.fromWei(balance, "ether"),
            initial_
        );
    });
});
