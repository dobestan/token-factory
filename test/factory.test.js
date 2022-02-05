const Factory = artifacts.require("Factory");
const Token = artifacts.require("Token");


contract("Factory", (accounts) => {
    let factory;

    before("get deployed factory contract.", async () => {
        factory = await Factory.deployed();
    });

    it("should have a owner.", async () => {
        assert.equal(
            await factory.owner(),
            accounts[0],
        );
    });

    describe("createToken function", () => {
        it("should create a token contract.", async () => {
            const name_ = "UltimatePowerfulBitcoin";
            const symbol_ = "UPBIT";
            const initial_ = 1000000;

            const deployed = await factory.createToken(
                name_,
                symbol_,
                initial_
            );
            const deployedTokenAddress = deployed.receipt.rawLogs[0].address;
            const deployedToken = await Token.at(deployedTokenAddress);

            assert.ok(deployedToken);
            assert.equal(await deployedToken.name(), name_);
            assert.equal(await deployedToken.symbol(), symbol_);
            assert.equal(
                web3.utils.fromWei(await deployedToken.balanceOf(factory.address), "ether"),
                initial_
            )
        });
    });
});
